import { initRenderer } from "./three/renderer";
import { onChangePcdFile } from "./three/pcd"
import { onChangeLeftImages } from "./three/images/left_image";
import { inputFiles } from "./html/element";
console.log("Hello World!");

window.addEventListener('DOMContentLoaded', initRenderer);
inputFiles.addEventListener("change", onChangePcdFile);

const inputImages = document.getElementById("inputLeftImage") as HTMLCanvasElement;
inputImages.addEventListener("change", onChangeLeftImages);