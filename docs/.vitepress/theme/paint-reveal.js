export const revealPosition = elapsed => {
  const phase = ((elapsed % 10000) + 10000) % 10000 / 10000;
  const ease = x => x * x * (3 - 2 * x);
  // Start with the finished body visible, then compare with the original wood.
  return phase < .25 ? 18 : phase < .5 ? 18 + 72 * ease((phase - .25) / .25) : phase < .65 ? 90 : 90 - 72 * ease((phase - .65) / .35);
};
