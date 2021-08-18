import initApp from "./appUI";
import "./style.css";

const string =
  "84, 78, 82, 119, 60, 102, 78, 58, 71, 97, 19, 113, 69, 102, 33, 30, 36, 39, 44, 113, 56, 42, 34, 31, 50, 75, 65, 84, 84, 45";

let testArr = string.split(", ").map((x) => +x);

testArr = [...new Set(testArr)];

initApp(testArr);
