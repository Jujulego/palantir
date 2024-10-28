import * as bigDataCloud from './big-data-cloud';
import * as ipData from './ip-data';
import * as ipGeolocation from './ip-geolocation';
import * as ipInfo from './ip-info';
import * as ipQualityScore from './ip-quality-score';

// Source index
export const ipSources = {
  [bigDataCloud.sourceId]: { label: bigDataCloud.sourceLabel, fetch: bigDataCloud.fetchBigDataCloud },
  [ipData.sourceId]: { label: ipData.sourceLabel, fetch: ipData.fetchIpData },
  [ipGeolocation.sourceId]: { label: ipGeolocation.sourceLabel, fetch: ipGeolocation.fetchIpGeolocation },
  [ipInfo.sourceId]: { label: ipInfo.sourceLabel, fetch: ipInfo.fetchIpInfo },
  [ipQualityScore.sourceId]: { label: ipQualityScore.sourceLabel, fetch: ipQualityScore.fetchIpQualityScore },
};

// Utils
export function validateSourceIdParam(sourceId?: string | null) {
  if (sourceId && sourceId in ipSources) {
    return sourceId as keyof typeof ipSources;
  }

  return ipInfo.sourceId;
}