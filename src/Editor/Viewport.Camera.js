import { UISelect } from "../libs/ui";

class ViewportCamera {
  constructor(editor) {
    this.editor = editor;

    this.container = new UISelect();

    this.container.setPosition("absolute");
    this.container.setRight("10px");
    this.container.setTop("10px");
    this.container.onChange(() => {
      this.editor.setViewportCamera(this.getValue);
    });

    this.editor.signals.cameraAdded.add(() => {
      this.update();
    });

    this.editor.signals.cameraRemoved.add(() => {
      this.update();
    });
    this.update();
  }

  update() {
    const options = {};
    const cameras = this.editor.cameras;
    for (let key in cameras) {
      let camera = cameras[key];
      options[camera.uuid] = camera.name;
    }
    this.container.setOptions(options);
    this.container.setValue(this.editor.viewportCamera.uuid);
  }
}

export { ViewportCamera };
