import {fixedNum} from './number';

export enum Time {
  nanoSecond = 1000000000,
}

export const tickToNanoS = (time: number) => {
  return time * 100;
};

export const timeConvert = (time: number, type: Time) => {
  return fixedNum(time / type);
};
