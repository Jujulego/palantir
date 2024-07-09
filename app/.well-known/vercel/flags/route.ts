import { type ApiData, verifyAccess } from '@vercel/flags';
import { NextRequest, NextResponse } from 'next/server';

import { showIpData } from '@/src/flags';

export async function GET(request: NextRequest) {
  // Check access
  const access = await verifyAccess(request.headers.get('Authorization'));

  if (!access) {
    return Response.json(null, { status: 401 });
  }

  // Flags
  return NextResponse.json<ApiData>({
    definitions: {
      [showIpData.key]: {
        description: 'Control access to Ip Data result',
        options: [
          { value: true, label: 'On' },
          { value: false, label: 'Off' }
        ]
      }
    }
  });
}
