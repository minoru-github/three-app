import { initRenderer } from "./three/three-main";
import { onChangePcdFile } from "./three/3d-space/pcd"
import { onChangeInputImages } from "./three/rgb-image/update-rgb-images";
import { pcdFiles } from "./html/element";
console.log("Hello World!");

window.addEventListener('DOMContentLoaded', initRenderer);
pcdFiles.addEventListener("change", onChangePcdFile);

const inputImages = document.getElementById("inputImages") as HTMLCanvasElement;
inputImages.addEventListener("change", onChangeInputImages);
