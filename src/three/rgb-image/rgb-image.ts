import { drawCameraFov } from "../xyz-space/camerasThreeJS/camera-fov";

export class RgbImage {
    data: File[] = new Array();
    calib: File = new File([], "empty");
    frames: number = 0;
    constructor() {
        this.data = new Array<File>();
    }

    addData(file: File) {
        return new Promise<File>((resolve) => {
            this.data.push(file);
            this.frames += 1;
            resolve(file);
        })
    }

    setCalib(file: File) {
        return new Promise<File>((resolve) => {
            this.calib = file;
            resolve(file);
        })
    }

    draw(frame: number) {
        if (this.frames < frame || this.data.length == 0) {
            return;
        }
        drawRgbImages(this.data[frame]);
    }

    totalFrames() {
        return this.frames;
    }
}

function drawRgbImages(file: File) {
    const result = file.name.match(/left_image|right_image/);
    if (result == null) {
        return;
    }

    const leftOrRight = result[0];
    if (leftOrRight == "left_image") {
        drawCameraFov();
    }

    const promise = createDataURL(file);
    promise.then((path: string) => {
        setImageToCanvas(path, leftOrRight);
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

    function setImageToCanvas(path: string, leftOrRight:string) {
        const image = new Image();
        image.src = path;
        image.onload = function () {
            const canvas = document.getElementById(leftOrRight) as HTMLCanvasElement;
            let context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            if (context != null) {
                context.drawImage(image, 0, 0);
            }
        }
    }
}

export const leftImage = new RgbImage();
export const rightImage = new RgbImage();