import { UIBreak, UIPanel, UIText } from "../libs/ui";

class ViewHelper {
  constructor(editor) {
    this.editor = editor;

    this.container = new UIPanel();
    this.container.setId("info");
    this.container.setPosition("absolute");
    this.container.setLeft("10px");
    this.container.setBottom("10px");
    this.container.setFontSize("12px");
    this.container.setColor("#fff");

    this.info = {};

    this.addInfo("viewport/info/objects");
    this.addInfo("viewport/info/vertices");
    this.addInfo("viewport/info/triangles");
    this.addInfo("viewport/info/frametime");

    const updateFrametime = (frametime) => {
      this.updateInfo(
        "viewport/info/frametime",
        Number(frametime).toFixed(2) + " ms"
      );
    };
    this.editor.signals.sceneRendered.add(updateFrametime);
    const callbackUpdate = () => {
      this.update();
    };
    this.editor.signals.objectAdded.add(callbackUpdate);
    this.editor.signals.objectRemoved.add(callbackUpdate);
    this.editor.signals.geometryChanged.add(callbackUpdate);
  }

  addInfo(key) {
    const text = new UIText("0").setMarginLeft("6px");
    this.container.add(
      new UIText(this.editor.strings.getKey(key)).setTextTransform("lowercase")
    );
    this.container.add(text, new UIBreak());
    this.info[key] = text;
  }

  updateInfo(key, value) {
    this.info[key].setValue(value);
  }

  update() {
    const scene = this.editor.scene;
    let objects = 0,
      vertices = 0,
      triangles = 0;

    for (let i = 0, l = scene.children.length; i < l; i++) {
      const object = scene.children[i];
      object.traverseVisible((objectVisible) => {
        objects++;
        if (objectVisible.isMesh) {
          const geometry = object.geometry;
          vertices += geometry.attributes.position.count;
          if (geometry.index) {
            triangles += geometry.index.count / 3;
          } else {
            triangles += geometry.attributes.position.count / 3;
          }
        }
      });
    }

    this.updateInfo("viewport/info/objects", objects.format());
    this.updateInfo("viewport/info/vertices", vertices.format());
    this.updateInfo("viewport/info/triangles", triangles.format());
  }
}
export { ViewHelper };
