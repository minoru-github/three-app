import * as THREE from 'three';
import { Camera } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GUI } from 'dat.gui'

const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

export function createCamera() {
    const perspectiveCamera = () => {
        const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 10000);
        camera.position.set(10, 20, -10);
        return camera;
    }
    const orthographicCamera = () => {
        const camera = new THREE.OrthographicCamera(-canvas.width / 20, canvas.width / 20, canvas.height / 20, -canvas.height / 20, -1000, 1000);
        camera.position.set(1, 2, -1);
        return camera;
    }

    //const camera = perspectiveCamera();
    const camera = orthographicCamera();

    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
}

export function createCameraControl(camera: Camera) {
    const controls = new OrbitControls(camera, canvas);
    return controls;
}

const gui = new GUI()
const cameraFolder = gui.addFolder('Camera')
//cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()