import * as THREE from "three";

// 箱を作成(デバッグ用)
const offsetY = 1.2;
let boxId = 0;
export function createAnnotatedBox(xCamera: number, yCamera: number, zCamera: number, distImage: number, xWorld: number, yWorld: number, zWorld: number) {
    const geometry = new THREE.BoxGeometry(10, 20, 10);
    const material = new THREE.MeshBasicMaterial({ color: 0x00FFFF, wireframe: true });
    const box = new THREE.Mesh(geometry, material);
    box.name = "annotated box-" + boxId;
    boxId++;

    const xImage = distImage * calculateTangent(xCamera, xWorld);
    const yImage = distImage * calculateTangent(yCamera, yWorld);

    box.position.set(xCamera + xImage, yCamera + yImage, zCamera + distImage);

    function calculateTangent(posCamera: number, posWorld: number) {
        return (posWorld - posCamera) / (zWorld - zCamera);
    }

    return box;
}
