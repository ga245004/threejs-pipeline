import { UIPanel } from "./../libs/ui";
import { SidebarProject } from "./Project";
class Sidebar {
  constructor(editor) {
    this.editor = editor;

    this.container = new UIPanel();
    this.dom = this.container.dom;

    this.project = new SidebarProject(this.editor);
  }
}

export { Sidebar };
