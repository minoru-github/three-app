import * as THREE from "three";
import { Float32BufferAttribute, Scene, Vector3 } from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";

import { scene } from "./renderer";

import { text } from "../html/element";

export function onChangePcdFile(event: any) {
    // https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/web-app/repositories/project-web-repository.ts#L24

    let files = event.target.files as FileList;
    const file = files[0];
    //loadAsDataURL(file);
    loadAsString(file);
}

function loadAsDataURL(file: File) {
    const promise = createDataURL(file);
    promise.then((path) => {
        loadPcd(path, scene);
    });

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

    function loadPcd(path: string, scene: Scene) {
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
}

function loadAsString(file: File) {
    // https://runebook.dev/ja/docs/dom/blob/text
    const promise = file.text();
    promise.then((pcdFile: string) => {
        //console.log(data);
        //text.value = pcdFile;
        let { xyzVec, rgbVec } = extractData(pcdFile);

        let geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true, color: 0xffffff });
        
        if (xyzVec.length > 0 && rgbVec.length > 0) {
            geometry.setAttribute("position", new Float32BufferAttribute(xyzVec, 3));
            geometry.setAttribute("color", new Float32BufferAttribute(rgbVec, 3));
            material.vertexColors = true;

            // MEMO:geometryをそのままPointsに入れるとgeometryの中心を座標(0,0,0)に描画しているっぽい
            //      center計算して座標ずらす。
            geometry.computeBoundingBox();
            if (geometry.boundingBox != null) {
                const offset = new Vector3;
                geometry.boundingBox.getCenter(offset).negate()
                console.log(offset);
                geometry.translate(0,offset.y,offset.z);
            }
        } else {
            alert("data is empty");
        }

        const points = new THREE.Points(geometry, material);
        
        scene.add(points);
    });

    // https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/editor-module/utils/pcd-util.ts#L43
    // https://www.sejuku.net/blog/21049
    function parseHeader(data: string) {
        data.indexOf("WIDTH");
    }

    // https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/editor-module/utils/pcd-util.ts#L125
    function extractData(pcdFile: string) {
        const headerOfPoints = "POINTS ";
        const beginOfPoints = pcdFile.indexOf(headerOfPoints) + headerOfPoints.length;
        //pcdFile.match(/POINTS (.*)/);
        // ()で囲まれたところを抽出してくれる
        const result = pcdFile.match(/POINTS (.*)/);
        let points = 0;
        if (result != null) {
            points = parseInt(result[1]);
            console.log(points);
        }

        // とりあえずascii固定
        // TODO:DATAの検索を正規表現に変える
        const headerOfData = "DATA ascii\n";
        const beginOfData = pcdFile.indexOf(headerOfData) + headerOfData.length;
        const dataVec = pcdFile.slice(beginOfData).split("\n");

        const xyzVec = [];
        const rgbVec = [];
        for (let cnt = 0; cnt < points; cnt++) {
            const data = dataVec[cnt].split(" ");
            const x = parseFloat(data[1]);
            const y = parseFloat(data[2]);
            const z = parseFloat(data[0]);
            xyzVec.push(x);
            xyzVec.push(y);
            xyzVec.push(z);

            const r = 1.0;
            const g = 0.5;
            const b = 0.0;
            rgbVec.push(r);
            rgbVec.push(g);
            rgbVec.push(b);
        }

        return { xyzVec, rgbVec };
    }
}
