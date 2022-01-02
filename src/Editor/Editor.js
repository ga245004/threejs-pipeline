import { Signal } from "./../libs/signals.min";
import { Storage as _Storage } from "./../Utils/Storage";
import { Config } from "./../Utils/Config";

class Editor {
  constructor() {
    this.signals = {
      editScript: new Signal(),

      startPlayer: new Signal(),
      stopPlayer: new Signal(),

      toggleVR: new Signal(),
      exitedVR: new Signal(),

      editorCleared: new Signal(),

      savingStarted: new Signal(),
      savingFinised: new Signal(),

      transformModeChanged: new Signal(),
      snapChanged: new Signal(),
      spaceChanged: new Signal(),
      rendererCreated: new Signal(),
      rendererUpdated: new Signal(),

      sceneBackgroundChanged: new Signal(),
      sceneEnvironmentChanged: new Signal(),
      sceneFogChanged: new Signal(),
      sceneFogSettingsChanged: new Signal(),
      sceneGraphChanged: new Signal(),
      sceneRendered: new Signal(),

      geometryChanged: new Signal(),

      objectSelected: new Signal(),
      objectFocused: new Signal(),

      objectAdded: new Signal(),
      objectChanged: new Signal(),
      objectRemoved: new Signal(),

      cameraChanged: new Signal(),
      cameraResetted: new Signal(),

      cameraAdded: new Signal(),
      cameraRemoved: new Signal(),

      helperAdded: new Signal(),
      helperRemoved: new Signal(),

      materialAdded: new Signal(),
      materialChanged: new Signal(),
      materialRemoved: new Signal(),

      scriptAdded: new Signal(),
      scriptChanged: new Signal(),
      scriptRemoved: new Signal(),

      windowResize: new Signal(),

      showGridChanged: new Signal(),
      showHelpersChanged: new Signal(),
      refreshSidebarObject3D: new Signal(),
      historyChanged: new Signal(),

      viewportCameraChanged: new Signal(),

      animationStopped: new Signal()
    };

    this.config = new Config();
    this.storage = new _Storage();
  }

  selectByUuid(uuid) {}
  clear() {}
  fromJSON() {}
  toJson() {
    return {};
  }
}

export { Editor };
