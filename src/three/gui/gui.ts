import { GUI } from 'lil-gui'

import { box3d } from '../xyz-space/annotation/box-3d';

const gui = new GUI();

export function initGUI() {
    gui.addFolder("Box")
    gui.add(box3d, "x_m");
    gui.add(box3d, "y_m");
    gui.add(box3d, "z_m");
    gui.add(box3d, "set")
}
