import { initRenderer } from "./three/renderer";
import { onChangePcdFile } from "./three/pcd"
import { onChangeInputImages } from "./three/images/update_images";
import { pcdFiles } from "./html/element";
console.log("Hello World!");

window.addEventListener('DOMContentLoaded', initRenderer);
pcdFiles.addEventListener("change", onChangePcdFile);

const inputImages = document.getElementById("inputImages") as HTMLCanvasElement;
inputImages.addEventListener("change", onChangeInputImages);
