/**
 * Represents an Address
 */
export interface Address {
  readonly city?: string;
  readonly postalCode?: string;
  readonly region?: string;
  readonly country: string;
  readonly countryCode: string;
}
