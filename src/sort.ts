import { drawToScreen, addRenderData } from "./render";
class Sort {
  arr: Array<number>;
  constructor(arr: number[]) {
    this.arr = arr;
  }
  /**
   * @returns sorted array reference. (doesn't mutate original array)
   */
  selectionSort() {
    const tempArray: Array<number> = [...this.arr];
    for (let i = 0; i < tempArray.length; i++) {
      let min: number = i;
      for (let j = i; j < tempArray.length; j++) {
        if (tempArray[min] > tempArray[j]) min = j;
      }
      [tempArray[i], tempArray[min]] = [tempArray[min], tempArray[i]];
      addRenderData(tempArray);
    }
    drawToScreen();
    return tempArray;
  }

  /**
   * @returns sorted array reference. (doesn't mutate original array)
   */
  bubbleSort() {
    const tempArray: Array<number> = [...this.arr];
    for (let i = 0; i < tempArray.length - 1; i++) {
      let flag: boolean = false;
      for (let j = 0; j < tempArray.length - i - 1; j++) {
        if (tempArray[j] > tempArray[j + 1]) {
          [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
          flag = true;
          addRenderData(tempArray);
        }
      }
      if (!flag) break;
    }
    drawToScreen();
    return tempArray;
  }

  /**
   * @returns sorted array reference. (doesn't mutate original array)
   */
  insertionSort() {
    const tempArray: Array<number> = [...this.arr];
    for (let i = 1; i < tempArray.length; i++) {
      let hole: number = i;
      let value: number = tempArray[i];
      while (hole > 0 && tempArray[hole - 1] > value) {
        tempArray[hole] = tempArray[hole - 1];
        hole -= 1;
      }
      tempArray[hole] = value;
      addRenderData(tempArray);
    }

    drawToScreen();
    return tempArray;
  }
}

export default Sort;
