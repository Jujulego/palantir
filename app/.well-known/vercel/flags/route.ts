import { type ApiData, verifyAccess } from '@vercel/flags';
import { NextRequest, NextResponse } from 'next/server';

import { showBigDataCloud, showIpData, showIpGeolocation, showIpInfo, showIpQuality } from '@/src/flags';

export async function GET(request: NextRequest) {
  // Check access
  const access = await verifyAccess(request.headers.get('Authorization'));

  if (!access) {
    return Response.json(null, { status: 401 });
  }

  // Flags
  return NextResponse.json<ApiData>({
    definitions: {
      [showBigDataCloud.key]: {
        description: 'Control access to Big Data Cloud result',
        options: [
          { value: true, label: 'On' },
          { value: false, label: 'Off' }
        ]
      },
      [showIpData.key]: {
        description: 'Control access to Ip Data result',
        options: [
          { value: true, label: 'On' },
          { value: false, label: 'Off' }
        ]
      },
      [showIpGeolocation.key]: {
        description: 'Control access to Ip Geolocation result',
        options: [
          { value: true, label: 'On' },
          { value: false, label: 'Off' }
        ]
      },
      [showIpInfo.key]: {
        description: 'Control access to Ip Info result',
        options: [
          { value: true, label: 'On' },
          { value: false, label: 'Off' }
        ]
      },
      [showIpQuality.key]: {
        description: 'Control access to Ip Quality result',
        options: [
          { value: true, label: 'On' },
          { value: false, label: 'Off' }
        ]
      },
    }
  });
}
