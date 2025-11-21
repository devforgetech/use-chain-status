import { useEffect, useState } from 'react';
import { getChainStatus } from '../core/getChainStatus';
import { ChainStatus } from '../core/types';

const defaultRpc = (chainId: number) =>
  ({
    1: 'https://rpc.ankr.com/eth',
    137: 'https://polygon.llamarpc.com',
    10: 'https://optimism.llamarpc.com',
    42161: 'https://arbitrum.llamarpc.com',
    8453: 'https://mainnet.base.org',
  }[chainId] || '');

export function useChainStatus(
  chainId: number,
  opts?: {
    rpcUrl?: string;
    interval?: number;
  }
) {
  const rpc = opts?.rpcUrl ?? defaultRpc(chainId);
  const interval = opts?.interval ?? 5000;

  const [status, setStatus] = useState<ChainStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const s = await getChainStatus(chainId, rpc);
        if (!cancelled) {
          setStatus(s);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) setError(e);
      }
    }

    poll();
    const id = setInterval(poll, interval);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [chainId, rpc, interval]);

  return { status, loading, error };
}
