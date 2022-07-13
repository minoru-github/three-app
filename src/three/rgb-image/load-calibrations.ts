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
    posX_m: 0.0,
    posY_m: 1.65,
    posZ_m: 0.0,
}
