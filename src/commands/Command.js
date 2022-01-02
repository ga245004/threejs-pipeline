class Command {
  constructor(editor) {
    this.id = -1;
    this.inMemory = false;
    this.updatable = false;
    this.type = "";
    this.name = "";
    this.editor = editor;
  }

  toJSON() {
    const { type, id, name } = this;
    return {
      type,
      id,
      name
    };
  }

  fromJSON(json) {
    const { type, id, name, inMemory } = json;
    this.id = id;
    this.inMemory = inMemory;
    this.type = type;
    this.name = name;
  }
}

export { Command };
