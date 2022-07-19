import { depth } from "../xyz-space/depth/depth";
import { RgbImage } from "../rgb-image/rgb-image";

const left_image = new RgbImage();
const right_image = new RgbImage();

export function onChangeInputFiles(event: any) {
    let files = event.target.files as FileList;

    const results = new Array<Promise<File>>();
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const result = parseFile(file);

        results.push(result);
    }

    function parseFile(file: File) {
        return new Promise<File>((resolve) => {
            if (file.name.match(/\.pcd/)) {
                return resolve(depth.addData(file));
            } else if (file.name.match(/\.(png|bmp|jpg)/)) {
                if (file.name.match(/left_image/)) {
                    return resolve(left_image.addData(file));
                } else if (file.name.match(/right_image/)) {
                    return resolve(right_image.addData(file));
                }
            } else if (file.name.match(/\.json/)) {
                if (file.name.match(/depth/)) {
                    return resolve(depth.setCalib(file));
                } else if (file.name.match(/left_image/)) {
                    return resolve(left_image.setCalib(file));
                } else if (file.name.match(/right_image/)) {
                    return resolve(right_image.setCalib(file));
                }
            }
        })
    }

    Promise.all(results).then(() => {
        const frame = 0;
        depth.draw(frame);
        left_image.draw(frame);
        right_image.draw(frame);
    })

}
