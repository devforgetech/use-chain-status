# use-chain-status

<p align="center">
  <img src="./logo.svg" width="60%">
</p>

<p align="center">
  <strong>Tiny (<5 KB) real-time EVM chain health & gas status</strong><br/>
  Zero dependencies · React hook + core utility · Multi-chain
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/use-chain-status.svg" />
  <img src="https://img.shields.io/bundlephobia/minzip/use-chain-status" />
  <img src="https://img.shields.io/npm/types/use-chain-status" />
  <img src="https://img.shields.io/github/license/devforgetech/use-chain-status" />
</p>

`use-chain-status` provides a tiny, zero-dependency utility + React
hook\
to monitor:

- 🟢 Chain health (healthy / slow / degraded / offline)\
- ⛽ Base fee\
- 💵 Gas price (optional)\
- ⚡ Congestion level\
- ⏱ Block time delay\
- 🔢 Latest block number\
- 📈 Pending transactions (if supported)

Perfect for dashboards, wallets, block explorers, DApps, and monitoring
UIs.

---

## 🚀 Install

    npm install use-chain-status

---

## 📦 Usage (React)

```ts
import { useChainStatus } from 'use-chain-status';

export default function App() {
  const { status, loading } = useChainStatus(1);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <p>Health: {status.health}</p>
      <p>Block: {status.blockNumber.toString()}</p>
      <p>Base Fee: {String(status.baseFee)}</p>
      <p>Congestion: {status.congestion}</p>
    </div>
  );
}
```

---

## 🔧 Options

```ts
useChainStatus(chainId, {
  rpcUrl?: string;
  interval?: number; // ms
});
```

### Custom RPC

```ts
useChainStatus(137, {
  rpcUrl: 'https://polygon.llamarpc.com',
  interval: 4000,
});
```

---

## 🧩 Framework-Agnostic Core

```ts
import { getChainStatus } from 'use-chain-status';

const status = await getChainStatus(1, 'https://rpc.ankr.com/eth');
```

---

## 📊 What's calculated?

### Congestion

Based on `gasUsed / gasLimit`.

### Health Levels

- No new block in \>12s → `offline`

- 6s → `degraded`

- Extreme congestion → `slow`

- Otherwise → `healthy`

---

## 🪪 License

MIT
