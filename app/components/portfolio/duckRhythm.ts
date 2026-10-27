// An active-time clock: pausing or leaving the viewport never skips the rest.
export function duckRhythm(elapsed: number, short = false) {
  const run = short ? 3.2 : 6.8, slow = 1.2, rest = short ? 1.8 : 2.6, start = .9;
  const phase = elapsed % (run + slow + rest + start);
  const smooth = (value: number) => value * value * (3 - 2 * value);
  if (phase < run) return { state: "run", pace: 1 };
  if (phase < run + slow) return { state: "slow", pace: 1 - smooth((phase - run) / slow) };
  if (phase < run + slow + rest) return { state: "breathe", pace: 0 };
  return { state: "start", pace: smooth((phase - run - slow - rest) / start) };
}

export function duckFrame(phase: number) {
  const pose = Math.floor(phase * 6) % 6;
  return `${pose % 3 * 50}% ${Math.floor(pose / 3) * 100}%`;
}
