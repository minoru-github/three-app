import { initRenderer } from "./three/renderer";
import { onChangePcdFile } from "./three/pcd"
import { inputFiles } from "./html/element";
console.log("Hello World!");

window.addEventListener('DOMContentLoaded', initRenderer);
inputFiles.addEventListener("change", onChangePcdFile);
