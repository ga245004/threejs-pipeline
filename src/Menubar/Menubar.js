import { UIPanel } from "../libs/ui";
import { MenubarAdd } from "./MenubarAdd";
import { MenubarStatus } from "./MenubarStatus";

class Menubar {
  constructor(editor) {
    this.editor = editor;
    this.container = new UIPanel();
    this.container.setId("menubar");

    this.container.add(new MenubarAdd(this.editor).container);
    this.container.add(new MenubarStatus(this.editor).container);
  }
}

export { Menubar };
