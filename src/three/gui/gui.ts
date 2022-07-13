import { GUI } from 'lil-gui'

import { box3d } from '../xyz-space/annotation/box-3d';

const gui = new GUI();

export function initGUI() {
    gui.addFolder("Box")
    gui.add(box3d, "x_m").onChange(function setXyz(value: number) { box3d.center_m.x = value });
    gui.add(box3d, "y_m").onChange(function setXyz(value: number) { box3d.center_m.y = value });
    gui.add(box3d, "z_m").onChange(function setXyz(value: number) { box3d.center_m.z = value });
    gui.add(box3d, "w_m").onChange(function setSize(value: number) { box3d.size_m.x = value });
    gui.add(box3d, "h_m").onChange(function setSize(value: number) { box3d.size_m.y = value });
    gui.add(box3d, "d_m").onChange(function setSize(value: number) { box3d.size_m.z = value });
    gui.add(box3d, "set");
    gui.add(box3d, "set0");
    gui.add(box3d, "set1");
    gui.add(box3d, "set2");
}
