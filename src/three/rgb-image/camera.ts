// TODO:yaml or json読み込みに変更する
export const camera = {
    left: {
        width_pix: 1242,
        height_pix: 375,
        fx_pix: 9.895267e+02, // 焦点距離を画素ピッチで割ってpix単位に変換したもの
        fy_pix: 9.878386e+02,
        cx_pix: 7.020000e+02,
        cy_pix: 2.455590e+02,
        fovHorizontal_deg: 90,
        fovVertical_deg: 90 * (375 / 1242),
        posX_m: 0.06,
        posY_m: 1.65,
        posZ_m: 0.27,
        projectionMatrix : [
            [7.215377e+02, 0.000000e+00, 6.095593e+02, 4.485728e+01],
            [0.000000e+00, 7.215377e+02, 1.728540e+02, 2.163791e-01],
            [0.000000e+00, 0.000000e+00, 1.000000e+00, 2.745884e-03],
        ]
    },

    right: {
        width_pix: 1242,
        height_pix: 375,
        fx_pix: 9.037596e+02, // 焦点距離を画素ピッチで割ってpix単位に変換したもの
        fy_pix: 9.019653e+02,
        cx_pix: 6.957519e+02,
        cy_pix: 2.242509e+02,
        fovHorizontal_deg: 90,
        fovVertical_deg: 90 * (375 / 1242),
        posX_m: -0.54,
        posY_m: 1.65,
        posZ_m: 0.27,
        projectionMatrix: [
            [7.215377e+02, 0.000000e+00, 6.095593e+02, -3.395242e+02],
            [0.000000e+00, 7.215377e+02, 1.728540e+02, 2.199936e+00],
            [0.000000e+00, 0.000000e+00, 1.000000e+00, 2.729905e-03],
        ]
    }
}
