export function projectToImage(x_m: number, y_m: number, z_m: number) {
    // lidar
    const { x_pix, y_pix } = projectFromLidar(x_m, y_m, z_m);

    // stereo camera
    // function() {};

    return { x_pix, y_pix };

    function projectFromLidar(inX_m: number, inY_m: number, inZ_m: number) {
        const { x_m, y_m, z_m } = toDepthSensorCoord(inX_m, inY_m, inZ_m);
        // three.jsとcamera座標系のxyが逆なので符号反転
        const { x_pix, y_pix } = dot(-1 * x_m, -1 * y_m, z_m);

        return { x_pix, y_pix };
    }

    // memo: ステカメ用。作りかけ。
    // function convert(x_m: number, y_m: number, z_m: number) {
    //     const relativeX = -1 * camera.fx_pix * (x_m-camera.posX) / (z_m-camera.posZ);
    //     const relativeY = camera.fy_pix * (y_m - camera.posY) / (z_m - camera.posZ);
    //     const x_pix = camera.cx_pix + relativeX;
    //     const y_pix = camera.cy_pix + relativeY;

    //     return { x_pix, y_pix };
    // }
}

function dot(x_m: number, y_m: number, z_m: number) {
    const projectionMatrix = [
        [7.215377e+02, 0.000000e+00, 6.095593e+02, 4.485728e+01],
        [0.000000e+00, 7.215377e+02, 1.728540e+02, 2.163791e-01],
        [0.000000e+00, 0.000000e+00, 1.000000e+00, 2.745884e-03],
    ]

    const mat3x4 = projectionMatrix;
    const mat3x1_0 = mat3x4[0][0] * x_m + mat3x4[0][1] * y_m + mat3x4[0][2] * z_m + mat3x4[0][3];
    const mat3x1_1 = mat3x4[1][0] * x_m + mat3x4[1][1] * y_m + mat3x4[1][2] * z_m + mat3x4[1][3];
    const mat3x1_2 = mat3x4[2][0] * x_m + mat3x4[2][1] * y_m + mat3x4[2][2] * z_m + mat3x4[2][3];
    const x_pix = mat3x1_0 / mat3x1_2;
    const y_pix = mat3x1_1 / mat3x1_2;

    return { x_pix, y_pix };
}

//  測距センサーから路面におろしたところを本ツールの原点(ステカメの場合は真ん中)とする。座標系はthree.jsに従う。
const depthSensorToOrigin = {
    x_m: 0.0,
    y_m: -1.73,
    z_m: 0.0,
}

export function toOrigin(inX_m: number, inY_m: number, inZ_m: number) {
    const x_m = inX_m - depthSensorToOrigin.x_m;
    const y_m = inY_m - depthSensorToOrigin.y_m;
    const z_m = inZ_m - depthSensorToOrigin.z_m;
    return { x_m, y_m, z_m };
}

function toDepthSensorCoord(inX_m: number, inY_m: number, inZ_m: number) {
    const x_m = inX_m + depthSensorToOrigin.x_m;
    const y_m = inY_m + depthSensorToOrigin.y_m;
    const z_m = inZ_m + depthSensorToOrigin.z_m;
    return { x_m, y_m, z_m };
}