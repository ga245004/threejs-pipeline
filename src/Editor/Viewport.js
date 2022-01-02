import { UIPanel } from "./../libs/ui";
import { PMREMGenerator } from "three";
class Viewport {
  constructor(editor) {
    this.editor = editor;

    this.container = new UIPanel();
    this.dom = this.container.dom;
    this.container.setId("viewport");
    this.container.setPosition("absolute");

    this.scene = this.editor.scene;
    this.renderer = null;
    this.pmremGenerator = null;
    this.startTime = 0;
    this.endTime = 0;

    this.editor.signals.rendererCreated.add(this.setRenderer);
  }

  setRenderer(newRenderer) {
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
      this.renderer.dispose();
      this.pmremGenerator.dispose();
      this.container.dom.removeChild(this.renderer.domElement);
    }
    this.renderer = newRenderer;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      this.container.dom.offsetWidth,
      this.container.dom.offsetHeight
    );

    this.pmremGenerator = new PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();

    this.container.dom.appendChild(this.renderer.domElement);

    this.render();
  }

  render() {
    this.startTime = performance.now();

    this.renderer.setViewport(
      0,
      0,
      this.container.dom.offsetWidth,
      this.container.dom.offsetHeight
    );
    this.renderer.render(this.scene, this.editor.viewportCamera);

    this.endTime = performance.now();
    this.editor.signals.sceneRendered.dispatch(this.endTime - this.startTime);
  }
}

export { Viewport };
