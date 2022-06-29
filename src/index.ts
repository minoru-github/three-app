import { initRenderer } from "./three/renderer";
import { onChangePcdFile } from "./three/pcd"
import { onChangeLeftImages } from "./three/images/left_image";
import { onChangeRightImages } from "./three/images/right_image";
import { inputFiles } from "./html/element";
console.log("Hello World!");

window.addEventListener('DOMContentLoaded', initRenderer);
inputFiles.addEventListener("change", onChangePcdFile);

const inputLeftImages = document.getElementById("inputLeftImage") as HTMLCanvasElement;
inputLeftImages.addEventListener("change", onChangeLeftImages);
const inputRightImages = document.getElementById("inputRightImage") as HTMLCanvasElement;
inputRightImages.addEventListener("change", onChangeRightImages);