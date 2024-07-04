export interface IpQualityResult {
  readonly success: boolean;
  readonly message: string;
  readonly fraud_score: number;
  readonly country_code: string;
  readonly region: string;
  readonly city: string;
  readonly ISP: string;
  readonly ASN: number;
  readonly organization: string;
  readonly is_crawler: boolean;
  readonly timezone: string;
  readonly mobile: boolean;
  readonly host: string;
  readonly proxy: boolean;
  readonly vpn: boolean;
  readonly tor: boolean;
  readonly active_vpn: boolean;
  readonly active_tor: boolean;
  readonly recent_abuse: boolean;
  readonly bot_status: boolean;
  readonly connection_type: string;
  readonly abuse_velocity: string;
  readonly zip_code: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly request_id: string;
}