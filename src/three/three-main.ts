import { tick3dSpace } from './xyz-space/xyz-space';
import { tickImages } from './rgb-image/rgb-image';
import { initGUI } from './gui/gui';

export function initThreeApp() {
    initGUI();

    tick();

    function tick() {
        requestAnimationFrame(tick);

        // レンダリング
        tick3dSpace();
        tickImages();
    }
}
