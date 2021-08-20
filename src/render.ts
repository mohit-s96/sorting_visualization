// type definitions

type printObject = {
  index: number;
  width: number;
  y: number;
  element: HTMLDivElement;
};
interface Hash {
  [key: string]: printObject;
}

// global variables

let currentTimerId = -1;
let currentRenderData: Array<any> = [];
const root = document.getElementById("root-inner") as HTMLDivElement;
let arrBuffer: Hash = {};
let pauseIndex: number = -1;
let isPlaying = false;
let animSpeed: number = 500;
let animationEnded = false;
const cbArray: Array<() => void> = [];

// render function

const render = (arr: Array<number>, flag: boolean): void => {
  if (flag) {
    currentRenderData = [];
    if (currentTimerId !== -1) clearTimeout(currentTimerId);
    arrBuffer = {};
    if (root.firstElementChild) {
      while (root.firstElementChild) {
        root.firstElementChild.remove();
      }
    }
    arr.forEach((x, i) => {
      const element = document.createElement("div");
      element.className = "bar";
      element.textContent = "" + x;
      arrBuffer[x] = {
        index: i,
        width: x,
        y: (i + 1) * 45,
        element,
      };
    });

    Object.keys(arrBuffer).forEach((val) => {
      const elem = arrBuffer[val];
      elem.element.style.left = `${elem.y}px`;
      elem.element.style.height = `${elem.width}px`;
      root.appendChild(elem.element);
    });
  } else {
    arr.forEach((x, i) => {
      arrBuffer[x].index = i;
      arrBuffer[x].y = (i + 1) * 45;
    });
    Object.keys(arrBuffer).forEach((val) => {
      const elem = arrBuffer[val];
      elem.element.style.left = `${elem.y}px`;
    });
  }
};

function _draw(n: number, anim: Array<any>): void {
  let x = n + 1;
  pauseIndex = x;
  if (x <= anim.length) {
    currentTimerId = setTimeout(() => {
      render(anim[n], false);
      _draw(x, anim);
    }, animSpeed);
  } else {
    animationEnded = true;
    isPlaying = false;
    cbArray.forEach((x) => x());
    if (currentTimerId !== -1) clearTimeout(currentTimerId);
    return;
  }
}

export function drawToScreen(): void {
  isPlaying = true;
  animationEnded = false;
  cbArray.forEach((x) => x());

  _draw(0, currentRenderData);
}

export function addRenderData(arr: Array<number>): void {
  currentRenderData.push([...arr]);
}

export function pauseAnimation() {
  if (currentTimerId !== -1) clearTimeout(currentTimerId);
  isPlaying = false;
}

export function resumeAnimation() {
  isPlaying = true;
  animationEnded = false;
  _draw(pauseIndex, currentRenderData);
}

export function isRendering(): boolean {
  return !isPlaying ? false : pauseIndex < currentRenderData.length;
}

export function runOnAnimationEnd(callback: () => void) {
  cbArray.push(callback);
}

export function changeSpeed(v: number, flag: boolean) {
  if (flag) animSpeed += v;
  else {
    if (animSpeed >= 50) animSpeed -= v;
  }
}

export function getCurrentSpeed() {
  return animSpeed;
}

export function cancelCurrentAnimation() {
  if (currentTimerId !== -1) clearTimeout(currentTimerId);
}

export function hasAnimationEnded() {
  return animationEnded;
}

export default render;
