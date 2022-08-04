import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import { drawCameraFov } from "../xyz-space/camerasThreeJS/camera-fov";

export class RgbImage {
    data: File[] = new Array();
    sensor_position = {
        "x_m": 0.0,
        "y_m": 0.0,
        "z_m": 0.0
    };
    fov = {
        "x_deg": 0.0,
        "y_deg": 0.0,
        "x_rad": 0.0,
        "y_rad": 0.0,
    }
    projection_matrix = [
        [0.0, 0.0, 0.0, 0.0,],
        [0.0, 0.0, 0.0, 0.0,],
        [0.0, 0.0, 0.0, 0.0,],
    ];
    frames: number = 0;
    constructor(scene: THREE.Scene) {
        this.data = new Array<File>();
        this.scene = scene;
    }
    scene: THREE.Scene | undefined = undefined;
    camera: THREE.PerspectiveCamera | undefined = undefined;

    addData(file: File) {
        return new Promise<File>((resolve) => {
            this.data.push(file);
            this.frames += 1;
            resolve(file);
        })
    }

    setCalib(file: File) {
        return new Promise<File>((resolve) => {
            const promise = file.text();
            promise.then((jsonString) => {
                const json = JSON.parse(jsonString);
                this.sensor_position.x_m = json.sensor_position.x_m;
                this.sensor_position.y_m = json.sensor_position.y_m;
                this.sensor_position.z_m = json.sensor_position.z_m;
                this.fov.x_deg = json.field_of_view.fovx_deg;
                this.fov.y_deg = json.field_of_view.fovx_deg * (json.size.height_pix / json.size.width_pix);
                this.fov.x_rad = this.fov.x_deg * Math.PI / 180;
                this.fov.y_rad = this.fov.y_deg * Math.PI / 180;
                this.projection_matrix = json.projection_matrix;
                resolve(file);
            })
        })
    }

    draw(frame: number) {
        if (this.frames < frame || this.data.length == 0) {
            return;
        }
        this.drawRgbImages(this.data[frame]);
    }

    totalFrames() {
        return this.frames;
    }

    projectToImage(x_m: number, y_m: number, z_m: number) {
        const projectFromXYZ = (inX_m: number, inY_m: number, inZ_m: number) => {
            const mat3x4 = this.projection_matrix;
            // three.jsとcamera座標系のxyが逆なので符号反転
            const { x_pix, y_pix } = dot(-1 * x_m, -1 * y_m, z_m, mat3x4);

            return { x_pix, y_pix };
        }

        const dot = (x_m: number, y_m: number, z_m: number, mat3x4: number[][]) => {
            const mat3x1_0 = mat3x4[0][0] * x_m + mat3x4[0][1] * y_m + mat3x4[0][2] * z_m + mat3x4[0][3];
            const mat3x1_1 = mat3x4[1][0] * x_m + mat3x4[1][1] * y_m + mat3x4[1][2] * z_m + mat3x4[1][3];
            const mat3x1_2 = mat3x4[2][0] * x_m + mat3x4[2][1] * y_m + mat3x4[2][2] * z_m + mat3x4[2][3];
            const x_pix = mat3x1_0 / mat3x1_2;
            const y_pix = mat3x1_1 / mat3x1_2;

            return { x_pix, y_pix };
        }

        // lidar
        const { x_pix, y_pix } = projectFromXYZ(x_m, y_m, z_m);
        return { x_pix, y_pix };
    }

    drawRgbImages(file: File) {
        const result = file.name.match(/left_image|right_image/);
        if (result == null) {
            return;
        }

        const leftOrRight = result[0];
        drawCameraFov(this.sensor_position, this.fov);

        const promise = createDataURL(file);
        promise.then((path: string) => {
            addImage(path, leftOrRight);
        })

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

        const addImage = (path: string, leftOrRight: string) => {
            const loader = new THREE.TextureLoader();
            loader.load(path, (texture) => {
                const canvas = document.getElementById(leftOrRight) as HTMLCanvasElement;
                const rate = canvas.height / texture.image.height;
                const w = texture.image.width * rate;
                const h = canvas.height;

                const geometry = new THREE.PlaneGeometry(1, 1);
                const material = new THREE.MeshBasicMaterial({ map: texture });
                const plane = new THREE.Mesh(geometry, material);
                plane.scale.set(w, h, 1);
                this.scene?.add(plane);

                const fovRad = (this.fov.y_rad / 2);
                const dist = canvas.height / 2 / Math.tan(fovRad);

                this.camera = new THREE.PerspectiveCamera(this.fov.y_deg, canvas.width / canvas.height, 0.01, 1000);
                this.camera.position.z = dist;
                this.scene?.add(this.camera);

                this.controls = new OrbitControls(this.camera, canvas);
            });
        }
    }

    addAnntotaionBox(center_m: THREE.Vector3, size_m: THREE.Vector3, euler: THREE.Euler) {
        if (this.camera != undefined && this.scene != undefined) {
            const rate = this.camera.position.z / center_m.z;
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.4 });
            const box = new THREE.Mesh(geometry, material);
            box.scale.set(size_m.x * rate, size_m.y * rate, size_m.z * rate);

            //box.position.set(center_m.x, center_m.y + size_m.y / 2, center_m.z);

            box.position.set(
                -(center_m.x - this.sensor_position.x_m) * rate,
                -(center_m.y + size_m.y / 2 - 0.08) * rate,
                (center_m.z + this.sensor_position.z_m) * rate - this.camera.position.z
            );


            box.setRotationFromEuler(euler);
            box.name = "annotatedBox";
            //annotatedBoxes.push(box);

            this.scene.add(box);
            console.log(this.scene);
        }

    }

    controls: OrbitControls | undefined = undefined;

}
