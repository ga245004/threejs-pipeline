import { ObjectLoader } from "three";

const { Command } = require("./Command");

class AddObjectCommand extends Command {
  constructor(editor, object) {
    super(editor);

    this.type = "AddObjectCommand";
    this.object = object;
    if (this.object) {
      this.name = `Add Object: ${object.name}`;
    }
  }

  execute() {
    this.editor.addObject(this.object);
    this.editor.select();
  }
  undo() {
    this.editor.removeObject(this.object);
    this.editor.deselect();
  }
  toJSON() {
    const output = super.toJSON();
    output.object = this.object.toJSON();
    return output;
  }
  fromJSON(json) {
    super.fromJSON(json);
    this.object = this.editor.objectByUuid(json.object.object.uuid);
    if (!this.object) {
      const loader = new ObjectLoader();
      this.object = loader.parse();
    }
  }
}

export { AddObjectCommand };
