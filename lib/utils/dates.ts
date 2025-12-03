export function determineDay() {
  const today = new Date();
  const dec1 = new Date("December 1 2025");
  const dec13 = new Date("December 13 2025");

  if (today < dec1) {
    return -Number.MAX_SAFE_INTEGER;
  }
  if (today > dec13) {
    return Number.MAX_SAFE_INTEGER;
  }

  return today.getDate();
}

export function currentDay() {
  return Math.min(12, Math.max(0, determineDay()));
}