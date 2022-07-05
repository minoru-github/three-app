import { GUI } from 'lil-gui'

import { box3d } from '../xyz-space/annotation/box-3d';

const gui = new GUI();

export function initGUI() {
    gui.addFolder("Box")
    gui.add(box3d, "x");
    gui.add(box3d, "y");
    gui.add(box3d, "z");
    gui.add(box3d, "set")
}
