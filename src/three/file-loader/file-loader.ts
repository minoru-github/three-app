import { Depth } from "../xyz-space/depth/depth";
import { RgbImage } from "../rgb-image/rgb-image";

const depth = new Depth();
const left_image = new RgbImage();
const right_image = new RgbImage();

export function onChangeInputFiles(event: any) {
    let files = event.target.files as FileList;

    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file.name.match(/\.pcd/)) {
            depth.addData(file);
        } else if (file.name.match(/\.(png|bmp|jpg)/)) {
            if (file.name.match(/left_image/)) {
                left_image.addData(file);
            } else if (file.name.match(/right_image/)) {
                right_image.addData(file);
            }
        } else if (file.name.match(/\.json/)) {
            if (file.name.match(/ depth/)) {
                depth.addCalib(file);
            } else if (file.name.match(/left_image/)) {
                left_image.addCalib(file);
            } else if (file.name.match(/right_image/)) {
                right_image.addCalib(file);
            }
        }
    }

    const frame = 0;
    depth.draw(frame);    
    left_image.draw(frame);
    right_image.draw(frame);
}
