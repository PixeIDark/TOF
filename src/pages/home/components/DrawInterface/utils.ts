// 120뽑 1윈충족, 패패승 <= 함수 만들자
// 80뽑시 1윈충족(골드만)
// 1뽑시 0.75% 확률
// 베르누이 시행과 이항 분포의 개념 알아야함 ㅋㅋ

function logFactorial(n: number): number {
  if (n === 0 || n === 1) return 0;
  let result = 0;
  for (let i = 2; i <= n; i++) {
    result += Math.log(i);
  }
  return result;
}

function logCombination(n: number, k: number): number {
  return logFactorial(n) - logFactorial(k) - logFactorial(n - k);
}

function logBinomialProbability(n: number, k: number, p: number): number {
  return logCombination(n, k) + k * Math.log(p) + (n - k) * Math.log(1 - p);
}

// 패패승 승승패 넣어야함
export function goldCoreProbability(n: number, k: number): number {
  let totalProbability = 0;
  const p = 3 / 400; // 한 번의 시도에서 성공할 확률
  const perfectChance = Math.floor(n / 80);
  const mileage = Math.floor(n / 120);
  k = k - perfectChance - mileage;
  console.log(k);
  if (k <= 0) return 100;

  // k번 이상 성공할 확률을 계산
  for (let i = k; i <= n; i++) {
    totalProbability += Math.exp(logBinomialProbability(n, i, p));
  }

  return parseFloat((totalProbability * 100).toFixed(10));
}
