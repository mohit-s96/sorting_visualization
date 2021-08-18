import render, {
  changeSpeed,
  getCurrentSpeed,
  isRendering,
  pauseAnimation,
  resumeAnimation,
  runOnAnimationEnd,
} from "./render";
import Sort from "./sort";

function repaint(str: string, sortArr: Sort) {
  switch (str) {
    case "ssort":
      sortArr.selectionSort();
      break;
    case "bsort":
      sortArr.bubbleSort();
      break;
    case "isort":
      sortArr.insertionSort();
      break;
    default:
      break;
  }
}
function handleAnimationTiming(flag: boolean, timeTextNode: HTMLSpanElement) {
  let val = getComputedStyle(document.body).getPropertyValue(
    "--animation-time"
  );

  val = val.slice(0, -2); // trim the trailing "ms" from the string
  let time = +val;

  if (flag) {
    time += 100;
  } else {
    if (time >= 100) {
      time -= 100;
    }
  }

  timeTextNode.textContent = time + "ms";
  document.body.style.setProperty("--animation-time", time + "ms");
}
function initApp(arr: Array<number>): void {
  // rendering on change

  render(arr, true);
  const select = document.getElementById("select-algo") as HTMLSelectElement;
  let initialState = select.value;
  const sortObject = new Sort([...arr]);
  repaint(initialState, sortObject);
  select?.addEventListener("change", () => {
    if (select.value !== initialState) {
      render(arr, true);

      initialState = select.value;
      repaint(initialState, sortObject);
    }
  });

  // timing control

  const upBtn = document.getElementById("time-up") as HTMLButtonElement;
  const downBtn = document.getElementById("time-down") as HTMLButtonElement;
  const timeText = document.querySelector(".timing-text") as HTMLSpanElement;

  upBtn!.onclick = () => {
    handleAnimationTiming(true, timeText);
  };
  downBtn!.onclick = () => {
    handleAnimationTiming(false, timeText);
  };

  // generate new array

  const randomizeBtn = document.getElementById("random-btn");
  randomizeBtn!.onclick = () => {
    let new_arr = [];
    let i = 0;
    while (i < 25) {
      new_arr[i++] = Math.floor(Math.random() * 125) + 25;
    }
    // remove duplicates
    new_arr = [...new Set(new_arr)];
    initApp(new_arr);
  };

  // play and pause

  const playBtn = document.getElementById("play-btn");

  playBtn!.textContent = isRendering() ? "Pause" : "Play";

  runOnAnimationEnd(() => {
    playBtn!.textContent = isRendering() ? "Pause" : "Play";
  });

  playBtn!.onclick = () => {
    if (isRendering()) {
      pauseAnimation();
    } else {
      resumeAnimation();
    }
    playBtn!.textContent = isRendering() ? "Pause" : "Play";
  };

  // render loop speed
  const speedUp = document.getElementById("speed-up");
  const speedDown = document.getElementById("speed-down");
  const speedText = document.getElementById("speed-text");

  speedUp!.onclick = () => {
    changeSpeed(50, true);
    speedText!.textContent = "" + getCurrentSpeed();
  };

  speedDown!.onclick = () => {
    changeSpeed(50, false);
    speedText!.textContent = "" + getCurrentSpeed();
  };
}

export default initApp;
