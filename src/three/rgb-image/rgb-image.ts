import { drawCameraFov } from "../xyz-space/camerasThreeJS/camera-fov";

export function drawRgbImages(file: File) {
    const result = file.name.match(/left|right/);
    if (result == null) {
        return;
    }

    const leftOrRight = result[0];
    if (leftOrRight == "left") {
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
            const imageType = leftOrRight + "Image";
            const canvas = document.getElementById(imageType) as HTMLCanvasElement;
            let context = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            if (context != null) {
                context.drawImage(image, 0, 0);
            }
        }
    }
}
