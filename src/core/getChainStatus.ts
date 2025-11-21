import { ChainStatus } from './types';
import { hexToBigInt, hexToNumber } from './normalize';
import { calculateCongestion, calculateHealth } from './healthScore';

async function rpcCall(rpcUrl: string, method: string, params: any[] = []) {
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method,
    params,
  };

  const res = await fetch(rpcUrl, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });

  const json = await res.json();
  return json.result;
}

export async function getChainStatus(chainId: number, rpcUrl: string): Promise<ChainStatus> {
  const now = Date.now();

  // 1. Latest block
  const blockNumberHex = await rpcCall(rpcUrl, 'eth_blockNumber');
  const blockNumber = hexToBigInt(blockNumberHex)!;

  // 2. Fetch block
  const block = await rpcCall(rpcUrl, 'eth_getBlockByNumber', [blockNumberHex, false]);

  const baseFee = hexToBigInt(block.baseFeePerGas);
  const gasUsed = hexToBigInt(block.gasUsed)!;
  const gasLimit = hexToBigInt(block.gasLimit)!;

  const congestion = calculateCongestion(gasUsed, gasLimit);

  const timestampMs = hexToNumber(block.timestamp)! * 1000;
  const blockDelay = now - timestampMs;

  const health = calculateHealth(blockDelay, congestion);

  // Optional: pending tx (not supported everywhere)
  let pending = null;
  try {
    const pendingTx = await rpcCall(rpcUrl, 'txpool_status');
    if (pendingTx?.pending) pending = Number(pendingTx.pending);
  } catch {}

  return {
    chainId,
    blockNumber,
    baseFee,
    gasPrice: null, // optionally use eth_gasPrice
    congestion,
    health,
    blockTimeMs: blockDelay,
    lastBlockTimestamp: timestampMs,
    pending,
    updatedAt: now,
  };
}
