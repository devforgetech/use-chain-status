export type CongestionLevel = 'low' | 'medium' | 'high' | 'extreme';

export type HealthLevel = 'healthy' | 'slow' | 'degraded' | 'offline';

export interface ChainStatus {
  chainId: number;
  blockNumber: bigint;
  baseFee: bigint | null;
  gasPrice: bigint | null;
  congestion: CongestionLevel;
  health: HealthLevel;
  blockTimeMs?: number;
  lastBlockTimestamp?: number;
  pending?: number | null;
  updatedAt: number;
}
