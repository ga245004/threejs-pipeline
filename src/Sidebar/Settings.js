import { UIPanel, UISpan } from "../libs/ui";
import { SidebarSettingsViewport } from "./SidebarSettingsViewport";

class SidebarSettings {
  constructor(editor) {
    this.editor = editor;

    this.container = new UISpan();

    const settings = new UIPanel();
    settings.setBorderTop("0");
    settings.setPaddingTop("20px");
    this.container.add(settings);

    this.container.add(new SidebarSettingsViewport(this.editor).container);
  }
}

export { SidebarSettings };
