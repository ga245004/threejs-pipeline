import { UIPanel, UISpan, UITabbedPanel } from "./../libs/ui";
import { SidebarProject } from "./Project";
import { SidebarSettings } from "./Settings";
class Sidebar {
  constructor(editor) {
    this.editor = editor;

    this.container = new UITabbedPanel();
    this.container.addClass("Sidebar");
    this.dom = this.container.dom;
    this.container.setId("sidebar");

    const scene = new UISpan(); //.add();

    const project = new SidebarProject(this.editor);
    const settings = new SidebarSettings(this.editor);

    this.container.addTab(
      "scene",
      this.editor.strings.getKey("sidebar/scene"),
      scene
    );
    this.container.addTab(
      "project",
      this.editor.strings.getKey("sidebar/project"),
      project.container
    );
    this.container.addTab(
      "settings",
      this.editor.strings.getKey("sidebar/settings"),
      settings.container
    );

    this.container.select("scene");
  }
}

export { Sidebar };
