import crypto from 'crypto';

export const toHash = (data: string) =>
  crypto.createHash('sha256').update(data).digest('hex');

/**
 * target 과 hash 를 같은지 비교함
 * @param target 원문 타겟 문자열
 * @param hash 비교대상 해시값
 */
export const compareHash = (target: string, hash: string) => {
  const hashedTarget = toHash(target);
  return target === hash;
};
