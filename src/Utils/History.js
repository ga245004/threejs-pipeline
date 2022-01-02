class History {
  constructor(editor) {
    this.editor = editor;
    this.undo = [];
    this.redo = [];
    this.lastCmdTime = new Date();
    this.idCouner = 0;

    this.historyDisabled = false;
  }

  execute(cmd, optionName) {
    const lastCmd = this.undo[this.undo.length - 1];
    const timeDiff = new Date().getTime() - this.lastCmdTime.getTime();
    console.log(this);
    cmd.name = optionName ? optionName : cmd.name;
    cmd.execute();
    cmd.inMemory = true;
    if (this.editor.config.getKey("settings/history")) {
      cmd.json = cmd.toJSON();
    }
    this.lastCmdTime = new Date();
    this.redo = [];
    this.editor.signals.historyChanged.dispatch(cmd);
  }
}

export { History };
