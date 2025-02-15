export interface DnsResponse {
  readonly Status: number;
  readonly TC: boolean;
  readonly RD: boolean;
  readonly RA: boolean;
  readonly AD: boolean;
  readonly CD: boolean;
  readonly Question: readonly DnsQuestion[],
  readonly Answer?: readonly DnsAnswer[];
  readonly Comment?: string;
  readonly edns_client_subnet?: string;
}

export interface DnsQuestion {
  readonly name: string;
  readonly type: number;
}

export interface DnsAnswer {
  readonly name: string;
  readonly type: number;
  readonly TTL: number;
  readonly data: string;
}
