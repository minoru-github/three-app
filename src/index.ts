import { initThreeApp } from "./three/three-main";
import { onChangePcdFile } from "./three/xyz-space/pcd"
import { onChangeInputImages } from "./three/rgb-image/update-rgb-images";
import { onChangeInputFiles } from "./three/file-loader/file-loader";
import { pcdFiles } from "./html/element";
console.log("Hello World!");

window.addEventListener('DOMContentLoaded', initThreeApp);
pcdFiles.addEventListener("change", onChangePcdFile);

const inputImages = document.getElementById("inputImages") as HTMLCanvasElement;
inputImages.addEventListener("change", onChangeInputImages);

const inputFiles = document.getElementById("inputFiles") as HTMLElement;
inputFiles.addEventListener("change", onChangeInputFiles);
