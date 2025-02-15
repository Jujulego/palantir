export interface IpInfoData {
  readonly ip: string;
  readonly hostname: string;
  readonly city: string;
  readonly region: string;
  readonly country: string;
  readonly loc: string;
  readonly org: string;
  readonly postal: string;
  readonly timezone: string;
  readonly anycast: boolean;
  readonly bogon?: false;
}

export interface IpInfoBogon {
  readonly ip: string;
  readonly bogon: true;
}

export type IpInfoResult = IpInfoData | IpInfoBogon;
