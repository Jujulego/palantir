import { verifyAccess } from '@vercel/flags';

import { showIpData } from '@/src/flags';

export async function GET(request: Request) {
  // Check access
  const access = await verifyAccess(request.headers.get('Authorization'));

  if (!access) {
    return Response.json(null, { status: 401 });
  }

  // Flags
  return Response.json({
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
