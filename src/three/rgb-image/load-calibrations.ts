// TODO:yaml読み込みに変更する
export const cameraCalib = {
    width_pix: 1242,
    height_pix: 375,
    fx_pix: 9.842439e+02, // 焦点距離を画素ピッチで割ってpix単位に変換したもの
    fy_pix: 9.808141e+02,
    cx_pix: 6.900000e+02,
    cy_pix: 2.331966e+02,
    fovHorizontal_deg: 90,
    fovVertical_deg: 90 * (375 / 1242),
    posX_m: 0.06,
    posY_m: 1.65,
    posZ_m: 0.27,
}

export const distanceSensorCalib = {
    posY_m: 1.73
}

export const projectionMatrix = [
    [7.215377e+02, 0.000000e+00, 6.095593e+02, 4.485728e+01],
    [0.000000e+00, 7.215377e+02, 1.728540e+02, 2.163791e-01],
    [0.000000e+00, 0.000000e+00, 1.000000e+00, 2.745884e-03],
]