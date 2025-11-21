import { CongestionLevel, HealthLevel } from './types';

export function calculateCongestion(gasUsed: bigint, gasLimit: bigint): CongestionLevel {
  const ratio = Number(gasUsed) / Number(gasLimit);

  if (ratio > 0.9) return 'extreme';
  if (ratio > 0.7) return 'high';
  if (ratio > 0.4) return 'medium';
  return 'low';
}

export function calculateHealth(blockDelay: number, congestion: CongestionLevel): HealthLevel {
  if (blockDelay > 12000) return 'offline';
  if (blockDelay > 6000) return 'degraded';
  if (congestion === 'extreme') return 'slow';
  return 'healthy';
}
