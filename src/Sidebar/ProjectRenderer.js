import { sRGBEncoding, WebGLRenderer } from "three";
import { UIBoolean, UIPanel, UIRow, UIText } from "../libs/ui";
import { AddBoolean, AddHeader, AddSelect } from "./UIHelper";

class ProjectRenderer {
  constructor(editor) {
    this.editor = editor;

    this.container = new UIPanel();

    AddHeader(
      this.container,
      this.editor.strings.getKey("sidebar/project/renderer")
    );

    this.antialiasBoolean = AddBoolean(
      this.container,
      this.editor.strings.getKey("sidebar/project/antialias"),
      this.editor.config.getKey("project/renderer/antialias")
    );
    this.antialiasBoolean.onChange(() => {
      this.createRenderer();
    });

    this.physicallyCorrectLightsBoolean = AddBoolean(
      this.container,
      this.editor.strings.getKey("sidebar/project/physicallyCorrectLights"),
      this.editor.config.getKey("project/renderer/physicallyCorrectLights")
    );
    this.physicallyCorrectLightsBoolean.onChange(() => {
      this.currentRenderer.physicallyCorrectLights = this.physicallyCorrectLightsBoolean.getValue();
      this.editor.signals.rendererUpdated.dispatch();
    });

    this.shadowsBoolean = AddBoolean(
      this.container,
      this.editor.strings.getKey("sidebar/project/shadows"),
      this.editor.config.getKey("project/renderer/shadows")
    );
    this.shadowsBoolean.onChange(() => {
      this.updateShadows();
    });

    const shadowTypes = {
      0: "Basic",
      1: "PCF",
      2: "PCF Soft"
      //	3: 'VSM'
    };
    this.shadowTypeSelect = AddSelect(
      this.container,
      this.editor.strings.getKey("sidebar/project/shadows"),
      shadowTypes
    );
    this.shadowTypeSelect.setValue(
      this.editor.config.getKey("project/renderer/shadowType")
    );
    this.shadowTypeSelect.onChange(() => {
      this.updateShadows();
    });

    this.currentRenderer = null;
    this.createRenderer();
  }

  createRenderer() {
    this.currentRenderer = new WebGLRenderer({
      antialias: this.antialiasBoolean.getValue()
    });
    this.currentRenderer.outputEncoding = sRGBEncoding;

    this.editor.signals.rendererCreated.dispatch(this.currentRenderer);
    this.editor.signals.rendererUpdated.dispatch();
  }

  updateShadows() {
    console.log(this.shadowTypeSelect.getValue());
    this.currentRenderer.shadowMap.enabled = this.shadowsBoolean.getValue();
    this.currentRenderer.shadowMap.type = parseFloat(
      this.shadowTypeSelect.getValue()
    );
    this.editor.signals.rendererUpdated.dispatch();
  }
}

export { ProjectRenderer };
