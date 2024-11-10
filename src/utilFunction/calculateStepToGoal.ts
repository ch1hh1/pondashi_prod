export const calculateStepToGoal = (start: number, goal: number, ratio: number): number[] => {
  // startとgoalの間（絶対値）を指定の割合で埋めていく配列

  // 増加か減算か判断
  let addFlg: boolean;
  if (start < goal) {
    addFlg = true;
  } else if (start > goal) {
    addFlg = false;
  } else {
    return []; // 2度と来るな
  }
  let absDiff = Math.abs(start - goal);
  const threshold = absDiff / 100;
  let steps: number[] = [];
  let flg: boolean;
  do {
    let step = absDiff - (absDiff - (absDiff / ratio));

    // 増加ならstartに足していく、逆もあるぞ
    start = addFlg? start + step : start - step;
    steps.push(start);
    absDiff = absDiff - step;
    flg = step > threshold;
  } while (flg)
  return steps;
}