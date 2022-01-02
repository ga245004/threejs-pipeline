import { UIPanel } from "../libs/ui";
import { AddBoolean, AddHeader } from "./UIHelper";

class SidebarSettingsViewport {
  constructor(editor) {
    this.editor = editor;

    this.container = new UIPanel();

    AddHeader(
      this.container,
      this.editor.strings.getKey("sidebar/settings/viewport")
    );

    const showGrid = AddBoolean(
      this.container,
      this.editor.strings.getKey("sidebar/settings/viewport/grid"),
      true
    );
    showGrid.onChange(() => {
      this.editor.signals.showGridChanged.dispatch(showGrid.getValue());
    });

    const showHelpers = AddBoolean(
      this.container,
      this.editor.strings.getKey("sidebar/settings/viewport/helpers"),
      true
    );
    showHelpers.onChange(() => {
      this.editor.signals.showHelpersChanged.dispatch(showHelpers.getValue());
    });
  }
}

export { SidebarSettingsViewport };
