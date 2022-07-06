import * as THREE from "three";
import { BufferGeometry, Float32BufferAttribute, Scene, Vector3 } from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader";

import { get3dSpaceSceneInstance } from "../xyz-space";

import { text } from "../../../html/element";

function loadPcdAsDataURL(file: File) {
    const promise = createDataURL(file);
    promise.then((path) => {
        loadPcd(path, get3dSpaceSceneInstance());
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

export function loadPcdAsString(file: File) {
    // https://runebook.dev/ja/docs/dom/blob/text
    const promise = file.text();
    promise.then((pcdFile: string) => {
        const geometry = new THREE.BufferGeometry();
        const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true, color: 0xffffff });
        let points = new THREE.Points(geometry, material);

        addDataToPoints(pcdFile, points);

        get3dSpaceSceneInstance().add(points);
    });

    // https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/editor-module/utils/pcd-util.ts#L43
    // https://www.sejuku.net/blog/21049
    function parseHeader(data: string) {
        data.indexOf("WIDTH");
    }

    function addDataToPoints(pcdFile: string, points: THREE.Points) {
        const { xyzVec, rgbVec } = extractData(pcdFile);

        if (xyzVec.length > 0 && rgbVec.length > 0) {
            points.geometry.setAttribute("position", new Float32BufferAttribute(xyzVec, 3));
            points.geometry.setAttribute("color", new Float32BufferAttribute(rgbVec, 3));

            toCenter(points.geometry);
        } else {
            alert("data is empty");
        }

        return { xyzVec, rgbVec };
    }

    // https://github.com/fastlabel/AutomanTools/blob/bf1fe121298a88443afdb64fc5d3527553dc8da0/src/editor-module/utils/pcd-util.ts#L125
    function extractData(pcdFile: string) {
        const headerOfPoints = "POINTS ";
        const beginOfPoints = pcdFile.indexOf(headerOfPoints) + headerOfPoints.length;
        //pcdFile.match(/POINTS (.*)/);
        // ()で囲まれたところを抽出してくれる
        const matchResultOfPoints = pcdFile.match(/POINTS (.*)/);
        let points = 0;
        if (matchResultOfPoints != null) {
            points = parseInt(matchResultOfPoints[1]);
            console.log(points);
        }

        // とりあえずascii固定
        const headerOfData = "DATA ascii";
        let lineFeedCode;
        if (pcdFile.match(headerOfData + "\r\n")) {
            lineFeedCode = "\r\n";
        } else if (pcdFile.match(headerOfData + "\n")) {
            lineFeedCode = "\n";
        } else {
            console.assert("改行コードが異常");
        }
        
        const xyzVec = [];
        const rgbVec = [];

        const matchResultOfData = pcdFile.match(/DATA ascii(\n|\r\n)/);
        let beginOfData;
        let dataHeaderLength;
        if (matchResultOfData != null) {
            const dataHeader = matchResultOfData[0];
            dataHeaderLength = dataHeader.length;
            beginOfData = pcdFile.search(/DATA ascii(\n|\r\n)/) + dataHeaderLength;
        }
        const dataVec = pcdFile.slice(beginOfData).split(/\n|\r\n/);

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

// MEMO:geometryをそのままPointsに入れるとgeometryの中心を座標(0,0,0)に描画しているっぽい
//      center計算して座標ずらす。
function toCenter(geometry:BufferGeometry) {
    geometry.computeBoundingBox();
    if (geometry.boundingBox != null) {
        const offset = new Vector3;
        geometry.boundingBox.getCenter(offset).negate()
        console.log(offset);
        geometry.translate(0, offset.y, offset.z);
    }
}
