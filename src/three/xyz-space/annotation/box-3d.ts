import * as THREE from "three";

import { sceneXyz } from "../xyz-space";
import { addAnnotationBoxToImage } from "../../rgb-image/annotated-box";
import { leftImage } from "../../rgb-image/left-image";

import { text } from "../../../html/element";
import { Camera, Scene } from "three";

function setBox() {
    // TODO: 右手座標系から左手座標系に変える
    console.log(box3d.rotation.euler);
    const center_m = box3d.center_m;
    const size_m = box3d.size_m;
    const rotation = box3d.rotation;

    addBoxToGroup(center_m, size_m, rotation.euler);
    leftImage.addAnntotaionBox(center_m, size_m, rotation.euler);
}

function setBox0() {
    const center_m = new THREE.Vector3(4.65, -0.1, 13.67);
    const size_m = new THREE.Vector3(1.8, 1.9, 4.4);
    const rotation = new Rotation(0.0, 32.0, 0);

    addBoxToGroup(center_m, size_m, rotation.euler);
    leftImage.addAnntotaionBox(center_m, size_m, rotation.euler);
}

function setBox1() {
    const center_m = new THREE.Vector3(-1.65, 0.0, 5.97);
    const size_m = new THREE.Vector3(0.6, 1.75, 1.6);
    const rotation = new Rotation(0.0, 6.0, 0);

    addBoxToGroup(center_m, size_m, rotation.euler);
    leftImage.addAnntotaionBox(center_m, size_m, rotation.euler);
}

function setBox2() {
    const center_m = new THREE.Vector3(-6.3, 0.0, 8.7);
    const size_m = new THREE.Vector3(0.6, 1.68, 1.0);
    const rotation = new Rotation(0.0, 35.0, 0);

    addBoxToGroup(center_m, size_m, rotation.euler);
    leftImage.addAnntotaionBox(center_m, size_m, rotation.euler);
}

function setBox3() {
    const center_m = new THREE.Vector3(4.8, 0.0, 7.44);
    const size_m = new THREE.Vector3(0.3, 1.2, 0.6);
    const rotation = new Rotation(0.0, 0.0, 0);
    addBoxToGroup(center_m, size_m, rotation.euler);
    leftImage.addAnntotaionBox(center_m, size_m, rotation.euler);
}

export const annotatedBoxes = new Array<THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>>;
function addBoxToGroup(center_m: THREE.Vector3, size_m: THREE.Vector3, euler: THREE.Euler) {
    const geometry = new THREE.BoxGeometry(size_m.x, size_m.y, size_m.z);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff,transparent:true,opacity:0.4 });
    const box = new THREE.Mesh(geometry, material);
    box.position.set(center_m.x, center_m.y + size_m.y / 2, center_m.z);
    box.setRotationFromEuler(euler);
    box.name = "annotatedBox";
    annotatedBoxes.push(box);

    sceneXyz.add(box);

    function debug() {
        let str = "";
        for (let index = 0; index < annotatedBoxes.length; index++) {
            const annotationBox = annotatedBoxes[index];
            str += annotationBox.name + " : (" + annotationBox.position.x + ", " + annotationBox.position.y + ", " + annotationBox.position.z + ")\n";
            text.value = str;
        }
    }
}

class Rotation {
    readonly pitch: { deg: number, rad: number };
    readonly yaw: { deg: number, rad: number };
    readonly roll: { deg: number, rad: number };
    readonly euler: THREE.Euler;

    private toRad(deg: number) {
        return deg * Math.PI / 180.0;
    };

    constructor(pitch_deg: number, yaw_deg: number, roll_deg: number) {
        this.pitch = { deg: pitch_deg, rad: this.toRad(pitch_deg) };
        this.yaw = { deg: yaw_deg, rad: this.toRad(yaw_deg) };
        this.roll = { deg: roll_deg, rad: this.toRad(roll_deg) };
        this.euler = new THREE.Euler(this.toRad(pitch_deg), this.toRad(yaw_deg), this.toRad(roll_deg), 'XYZ');
    }

    setPitch(degree: number) {
        this.pitch.deg = degree;
        this.pitch.rad = this.toRad(degree);
        this.euler.x = this.toRad(degree);
    }

    setYaw(degree: number) {
        this.yaw.deg = degree;
        this.yaw.rad = this.toRad(degree);
        this.euler.y = this.toRad(degree);
    }

    setRoll(degree: number) {
        this.roll.deg = degree;
        this.roll.rad = this.toRad(degree);
        this.euler.z = this.toRad(degree);
    }
}

export const box3d = {
    x_m: 0,
    y_m: 0,
    z_m: 10,
    center_m: new THREE.Vector3(0, 0, 10),
    w_m: 1,
    h_m: 1.5,
    d_m: 1,
    size_m: new THREE.Vector3(1, 1.5, 1),
    pitch_deg: 0.0,
    yaw_deg: 0.0,
    roll_deg: 0.0,
    rotation: new Rotation(0.0, 0.0, 0.0),
    set: function () { setBox() },
    set0: function () { setBox0() },
    set1: function () { setBox1() },
    set2: function () { setBox2() },
    set3: function () { setBox3() },
}

// TODO: クリックでアノテボックス配置
document.addEventListener('mousedown', addAnnotationBox, false);
function addAnnotationBox(event: MouseEvent) {
    // X座標
    let x = event.offsetX;
    let y = event.offsetY;
    // console.log("(w,h) = (%d, %d)", canvas.width, canvas.height);
    // console.log("offset (x,y) = (%d, %d)", event.offsetX, event.offsetY);
    // console.log("client (x,y) = (%d, %d)", event.clientX, event.clientY);
    // console.log(event);
}

const mainCameraCanvas = document.getElementById("mainCameraCanvas") as HTMLCanvasElement;
mainCameraCanvas.addEventListener('mousemove', handleMouseMove);
mainCameraCanvas.addEventListener('mousedown', handleMouseDown);

const mouse = new THREE.Vector2();
function handleMouseMove(event: any) {
    const element = event.currentTarget;
    // canvas要素上のXY座標
    const x_pix = event.offsetX;
    const y_pix = event.offsetY;
    // canvas要素の幅・高さ
    const width_pix = element.offsetWidth;
    const height_pix = element.offsetHeight;

    // -1〜+1の範囲で現在のマウス座標を登録する
    mouse.x = (x_pix / width_pix) * 2 - 1;
    mouse.y = 1 - (y_pix / height_pix) * 2;
}

export let intersectedObject: THREE.Object3D<THREE.Event> | undefined = undefined;
function handleMouseDown(event: any) {
    annotatedBoxes.forEach(box => {
        if (intersectedObject != undefined && box.id == intersectedObject.id) {
            box.material.opacity = 0.6;
            console.log(intersectedObject.position);
        } else {
            box.material.opacity = 0.4;
        }
    });
}

const raycaster = new THREE.Raycaster();
export const searchBoxAtCursor = (scene:Scene, camera:Camera) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    intersectedObject = undefined;
    for (let index = 0; index < intersects.length; index++) {
        const id = intersects[index].object.id;
        const intersect = scene.getObjectById(id);
        if (intersect?.name == "annotatedBox") {
            intersectedObject = intersect;
            break;
        }
    }
}
