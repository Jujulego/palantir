'use client';

import { MapboxContext } from '@/components/mapbox/MapboxMap';
import { stopAll } from '@/utils/motion';
import { LngLat } from 'mapbox-gl';
import { animate } from 'motion/react';
import { use, useEffect } from 'react';

// Constants
const CURVE = 1.42;
const SPEED = 1.2;

// Component
export interface MapboxFlyToProps {
  readonly latitude: number;
  readonly longitude: number;
  readonly zoom?: number;
}

export default function MapboxFlyTo({ latitude, longitude, zoom: _zoom }: MapboxFlyToProps) {
  const ctx = use(MapboxContext);

  useEffect(() => {
    if (!ctx.map || !ctx.isLoaded) return;

    const tr = ctx.map.transform;

    const startZoom = ctx.map.getZoom();
    const zoom = _zoom ?? startZoom;
    const scale = tr.zoomScale(zoom - startZoom);
    const center = LngLat.convert({ lat: latitude, lng: longitude });
    normalizeCenter(tr.center, center);

    const from = tr.project(tr.center);
    const delta = tr.project(center).sub(from);

    const rho = CURVE;
    const rho2 = rho * rho;
    const w0 = Math.max(tr.width, tr.height);
    const w1 = w0 / scale;
    const u1 = delta.mag();

    function r(i: number) {
      const b = (w1 * w1 - w0 * w0 + (i ? -1 : 1) * rho2 * rho2 * u1 * u1) / (2 * (i ? w1 : w0) * rho2 * u1);
      return Math.log(Math.sqrt(b * b + 1) - b);
    }

    const r0 = r(0);
    let w = (s: number) => cosh(r0) / cosh(r0 + rho * s);
    let u = (s: number) => w0 * ((cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2) / u1;
    let S = (r(1) - r0) / rho;

    if (typeof ctx.lat !== 'number') ctx.lat.set(tr.center.lat);
    if (typeof ctx.lng !== 'number') ctx.lng.set(tr.center.lng);
    if (typeof ctx.zoom !== 'number') ctx.zoom.set(startZoom);

    if (Math.abs(u1) < 1e-6 || !isFinite(S)) {
      if (Math.abs(w0 - w1) < 1e-6) {
        return stopAll(
          animate(ctx.lat, center.lat, { duration: 0.5 }),
          animate(ctx.lng, center.lng, { duration: 0.5 }),
          animate(ctx.zoom, zoom, { duration: 0.5 }),
        );
      }

      const k = w1 < w0 ? -1 : 1;
      S = Math.abs(Math.log(w1 / w0)) / rho;
      u = () => 0;
      w = (s) => Math.exp(k * rho * s);
    }

    const duration = S / SPEED;

    return stopAll(
      animate(ctx.lat, center.lat, { duration, ease: (k) => u(k * S) }),
      animate(ctx.lng, center.lng, { duration, ease: (k) => u(k * S) }),
      animate(ctx.zoom, [0, zoom], { duration, ease: (k) => (startZoom + tr.scaleZoom(1 / w(k * S))) / zoom }),
    );
  }, [latitude, longitude, ctx.isLoaded, ctx.lat, ctx.lng, ctx.zoom, _zoom, ctx.map]);

  return null;
}

// Utils
const sinh = (n: number) => (Math.exp(n) - Math.exp(-n)) / 2;
const cosh = (n: number) => (Math.exp(n) + Math.exp(-n)) / 2;
const tanh = (n: number) => sinh(n) / cosh(n);

function normalizeCenter(mapCenter: LngLat, center: LngLat) {
  const delta = center.lng - mapCenter.lng;
  center.lng += delta > 180 ? -360 : delta < -180 ? 360 : 0;
}
