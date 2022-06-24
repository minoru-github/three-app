import { Scene } from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";

import { scene } from "./renderer";

import { text } from "../html/element";

export function onChangePcdFile(event: any) {
    // https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/web-app/repositories/project-web-repository.ts#L24

    var files = event.target.files as FileList;
    const file = files[0];
    const promise = createDataURL(file);
    promise.then((path) => {
        loadPcd(path, scene);
    });
}

function createDataURL(file: File) {
    const promise = new Promise<string>((resolve, reject) => {
        //FileReaderオブジェクトの作成
        const reader = new FileReader();
        // onload = 読み込み完了したときに実行されるイベント
        reader.onload = (event) => {
            resolve(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    });
    return promise;
}

// https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/editor-module/utils/pcd-util.ts#L43
// https://www.sejuku.net/blog/21049
function parseHeader(data: string) {
    data.indexOf("WIDTH");
}

type XYZ = {
    x: number;
    y: number;
    z: number;
}

// https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/editor-module/utils/pcd-util.ts#L125
function extractData(pcdFile: string) {
    const headerOfPoints = "POINTS ";
    const beginOfPoints = pcdFile.indexOf(headerOfPoints) + headerOfPoints.length;
    //pcdFile.match(/POINTS (.*)/);
    // ()で囲まれたところを抽出してくれる
    const result = pcdFile.match(/POINTS (.*)/);
    var points = 0;
    if (result != null) {
        points = parseInt(result[1]);
        console.log(points);
    }

    // とりあえずascii固定
    // TODO:DATAの検索を正規表現に変える
    const headerOfData = "DATA ascii\n";
    const beginOfData = pcdFile.indexOf(headerOfData) + headerOfData.length;
    const dataVec = pcdFile.slice(beginOfData).split("\n");

    const xyzVec = new Array<XYZ>();
    for (var cnt = 0; cnt < points; cnt++) {
        const data = dataVec[cnt].split(" ");
        const xyz: XYZ = { x: parseFloat(data[0]), y: parseFloat(data[1]), z: parseFloat(data[2]) };
        xyzVec.push(xyz);
    }

    function debug(xyzVec: Array<XYZ>) {
        for (var cnt = 0; cnt < 10; cnt++) {
            console.log("x:%f, y:%f, z:%f", xyzVec[cnt].x, xyzVec[cnt].y, xyzVec[cnt].z);
        }
    }

    return xyzVec;
}

function loadPcd(path: string,scene:Scene) {
    const loader = new PCDLoader();
    loader.load(
        path,
        function (mesh) {
            mesh.geometry.center();
            mesh.geometry.rotateX(-Math.PI / 2);

            scene.add(mesh);
            //console.log(mesh.geometry.attributes);
            text.value = "complete";
        }
    );
}