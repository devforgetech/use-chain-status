export const hexToBigInt = (hex: string | null): bigint | null => {
  if (!hex) return null;
  return BigInt(hex);
};

export const hexToNumber = (hex: string | null): number | null => {
  if (!hex) return null;
  return Number(hex);
};
