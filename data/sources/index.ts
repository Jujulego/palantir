import * as bigDataCloud from './big-data-cloud';
import * as ipData from './ip-data';
import * as ipGeolocation from './ip-geolocation';
import * as ipInfo from './ip-info';
import * as ipQualityScore from './ip-quality-score';

// Source index
export const ipSources = {
  [bigDataCloud.sourceId]: { fetch: bigDataCloud.fetchBigDataCloud, rawFetch: bigDataCloud.rawFetchBigDataCloud },
  [ipData.sourceId]: { fetch: ipData.fetchIpData, rawFetch: ipData.rawFetchIpData },
  [ipGeolocation.sourceId]: { fetch: ipGeolocation.fetchIpGeolocation, rawFetch: ipGeolocation.rawFetchIpGeolocation },
  [ipInfo.sourceId]: { fetch: ipInfo.fetchIpInfo, rawFetch: ipInfo.rawFetchIpInfo },
  [ipQualityScore.sourceId]: { fetch: ipQualityScore.fetchIpQualityScore, rawFetch: ipQualityScore.rawFetchIpQualityScore },
};

export type SourceId = keyof typeof ipSources;

// Utils
export function validateSourceIdParam(sourceId?: string | null): SourceId {
  if (sourceId && sourceId in ipSources) {
    return sourceId as keyof typeof ipSources;
  }

  return ipInfo.sourceId;
}

export function isIpSourceIdParam(value?: string | null): value is SourceId {
  return value ? value in ipSources : false;
}
