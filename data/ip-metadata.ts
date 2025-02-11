import type { SourceId } from '@/data/sources';
import type { AutonomousSystem } from '@/lib/server/autonomous-system';
import type { Address } from '@/lib/utils/address';
import type { Location } from '@/lib/utils/location';
import type { Tag } from '@/lib/utils/tag';

export interface IpMetadata {
  readonly sourceId: SourceId;
  readonly ip: string;
  readonly hostname?: string;
  readonly asn?: AutonomousSystem;
  readonly address?: Address;
  readonly coordinates?: Location;
  readonly tags: readonly Tag[];
  readonly raw: unknown;
}
