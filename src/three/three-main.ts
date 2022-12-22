import { tick3dSpace } from './xyz-space/xyz-space';
import { tickLeftImage } from './rgb-image/left-image';
import { tickRightImage } from './rgb-image/right-image';
import { initGUI } from './gui/gui';

export function initThreeApp() {
    initGUI();

    tick();

    function tick() {
        requestAnimationFrame(tick);

        // レンダリング
        tick3dSpace();
        tickLeftImage();
        tickRightImage();
    }
}
