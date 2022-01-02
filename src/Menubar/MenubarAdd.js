import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";
import { AddObjectCommand } from "../commands/AddObjectCommand";
import { UIPanel, UIRow } from "../libs/ui";

class MenubarAdd {
  constructor(editor) {
    this.editor = editor;

    this.container = new UIPanel();
    this.container.setClass("menu");
    const title = new UIPanel();
    title.setClass("title");
    title.setTextContent(this.editor.strings.getKey("menubar/add"));
    this.container.add(title);

    this.options = new UIPanel();
    this.options.setClass("options");
    this.container.add(this.options);

    let group = this.addOption(this.editor.strings.getKey("menubar/add/group"));
    group.onClick(() => {
      let mesh = new Group();
      mesh.name = "Group";
      this.editor.execute(new AddObjectCommand(editor, mesh));
    });

    let box = this.addOption(this.editor.strings.getKey("menubar/add/box"));
    box.onClick(() => {
      let geometry = new BoxGeometry(1, 1, 1, 1, 1, 1);
      let mesh = new Mesh(geometry, new MeshStandardMaterial());
      mesh.name = "Box";
      this.editor.execute(new AddObjectCommand(editor, mesh));
    });
  }

  addOption(label) {
    let option = new UIRow();
    option.setClass("option");
    option.setTextContent(label);
    this.options.add(option);
    return option;
  }
}

export { MenubarAdd };
