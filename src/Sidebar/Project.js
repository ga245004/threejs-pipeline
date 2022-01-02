import { UIPanel, UISpan } from "./../libs/ui";

class SidebarProject {
  constructor(editor) {
    this.editor = editor;

    this.container = new UISpan();

    this.settings = new UIPanel();
    this.settings.setBorderTop(0);
    this.settings.setPaddingTop("20px");
    this.container.add(this.settings);
  }
}

export { SidebarProject };
