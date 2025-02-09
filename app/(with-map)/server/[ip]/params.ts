export interface WithMapServerIpParams {
  readonly ip: string;
}

export async function decodeIp(params: Promise<WithMapServerIpParams>): Promise<string> {
  return decodeURIComponent((await params).ip);
}
