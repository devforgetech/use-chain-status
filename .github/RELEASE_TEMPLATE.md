# 🚀 use-chain-status v{{version}}

## Summary

This release brings improvements to performance, stability, and
developer experience.\
`use-chain-status` provides tiny real-time chain health monitoring for
EVM networks.

## ✨ What's New

- Improved React hook stability
- Faster RPC polling
- Better type definitions
- ESM-only package (2025 npm standard)
- Updated peerDependencies (React 18--19)

## 🔧 Installation

    npm install use-chain-status

## 📦 Usage

```ts
const { status } = useChainStatus(1);
```

## 🧩 Core API

```ts
const info = await getChainStatus(1, RPC_URL);
```

## ❤️ Thanks

If you like this package, consider starring ⭐ the repo!
