// ボリュームが規定値か判断する
export const checkVol = (val: number, expect: number) => {
  return val === expect ? true : false;
}