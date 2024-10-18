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

const calculatorType = {
  redCore: [3 / 400, 0, (n: number) => Math.floor(n / 120)],
  yellowCore: [
    3 / 400,
    (n: number) => Math.floor(n / 80),
    (n: number) => Math.floor(n / 120),
  ],
  blackCore: [3 / 1000, 0, (n: number) => Math.floor(n / 1200)],
  redChip: [17 / 1000, 0, (n: number) => Math.floor(n / 80)],
  yellowChip: [
    17 / 1000,
    (n: number) => Math.floor(n / 40),
    (n: number) => Math.floor(n / 80),
  ],
};

const deathAndLife = (n: number, color: string) => {
  const murderer = color === "redCore" ? 80 : 40;
  const destiny = Math.floor(n / murderer);
  let rule = [];
  let redK = 0;

  for (let i = 0; i < destiny; i++) {
    if (rule.length >= 2 && rule[i - 2] === rule[i - 1]) {
      if ((rule[i - 1] = "패")) {
        rule.push("승");
        redK++;
      }
      if ((rule[i - 1] = "승")) rule.push("패");
      continue;
    }

    const random = Math.random();
    if (random < 0.5) rule.push("패");
    if (random >= 0.5) {
      rule.push("승");
      redK++;
    }
  }

  return redK;
};

export function probabilityCalculate(
  n: number,
  k: number,
  color: string
): number {
  console.log(color);
  let totalProbability = 0;
  let [p, a, b] = calculatorType[color];
  let perfectChance = typeof a === "function" ? a(n) : a;
  const mileage = b(n);
  if (color[0] === "r") perfectChance += deathAndLife(n, color);
  k = k - perfectChance - mileage;

  if (k <= 0) return 100;

  for (let i = k; i <= n; i++) {
    if (color === "redChip" && i === 40) {
      totalProbability += Math.exp(logBinomialProbability(n, i, 0));
    } else if (color === "redCore" && i === 80) {
      totalProbability += Math.exp(logBinomialProbability(n, i, 0));
    } else totalProbability += Math.exp(logBinomialProbability(n, i, p));
  }

  return parseFloat((totalProbability * 100).toFixed(10));
}
