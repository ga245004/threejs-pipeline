import { UIPanel } from "./../libs/ui";
class Viewport {
  constructor(editor) {
    this.editor = editor;

    this.container = new UIPanel();
    this.dom = this.container.dom;
    this.container.setId("viewport");
    this.container.setPosition("absolute");

    this.renderer = null;
    this.startTime = 0;
    this.endTime = 0;

    this.editor.signals.rendererCreated.add(this.setRenderer);
  }

  setRenderer(newRenderer) {
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
      this.renderer.dispose();

      this.container.dom.removeChild(this.renderer.domElement);
    }
    this.renderer = newRenderer;
  }

  render() {
    this.startTime = performance.now();

    this.endTime = performance.now();
    this.editor.signals.sceneRendered.dispatch(this.endTime - this.startTime);
  }
}

export { Viewport };
