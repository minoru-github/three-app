export function onChangeInputFiles(event: any) {
    let files = event.target.files as FileList;

    const pcdFiles = [];
    const imageFiles = [];
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file.name.match(/\.pcd/)) {
            pcdFiles.push(file);            
        } else if (file.name.match(/\.(png|bmp|jpg)/)) {
            imageFiles.push(file);
        }
    }
}
