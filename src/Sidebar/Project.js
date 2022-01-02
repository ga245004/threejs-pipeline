import { UIPanel, UISpan } from "./../libs/ui";
import { ProjectRenderer } from "./ProjectRenderer";

class SidebarProject {
  constructor(editor) {
    this.editor = editor;

    this.container = new UIPanel();
    this.container.setClass("Project");

    const settings = new UIPanel();
    settings.setBorderTop(0);
    settings.setPaddingTop("20px");
    this.container.add(settings);

    const projectRenderer = new ProjectRenderer(this.editor);
    this.container.add(projectRenderer.container);
  }
}

export { SidebarProject };
