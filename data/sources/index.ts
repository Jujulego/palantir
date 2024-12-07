import bigDataCloud from './big-data-cloud';
import ipData from './ip-data';
import ipGeolocation from './ip-geolocation';
import ipInfo from './ip-info';
import * as ipQualityScore from './ip-quality-score';

// Source index
export const ipSources = {
  [bigDataCloud.sourceId]: bigDataCloud,
  [ipData.sourceId]: ipData,
  [ipGeolocation.sourceId]: ipGeolocation,
  [ipInfo.sourceId]: ipInfo,
  [ipQualityScore.sourceId]: { fetch: ipQualityScore.fetchIpQualityScore, rawFetch: ipQualityScore.rawFetchIpQualityScore },
};

export type SourceId = keyof typeof ipSources;

// Utils
export function isSourceId(value?: string | null): value is SourceId {
  return value ? value in ipSources : false;
}

export function parseSourceIdParam(values: string | string[] = []): SourceId[] {
  if (!Array.isArray(values)) {
    values = [values];
  }

  const result: SourceId[] = [];

  for (const val of values) {
    const param = decodeURIComponent(val);

    if (isSourceId(param)) {
      result.push(param);
    }
  }

  if (result.length === 0) {
    return ['ip-info'];
  }

  return result;
}
