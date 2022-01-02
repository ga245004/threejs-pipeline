import { Scene, PerspectiveCamera, Vector3 } from "three";
import { Signal } from "./../libs/signals.min";
import { Storage as _Storage } from "./../Utils/Storage";
import { Config } from "./../Utils/Config";
import { Strings } from "../Utils/Strings";
import { History as _History } from "../Utils/History";

const _DEFAULT_CAMERA = new PerspectiveCamera(50, 1, 0.01, 1000);
_DEFAULT_CAMERA.name = "Camera";
_DEFAULT_CAMERA.position.set(0, 5, 10);
_DEFAULT_CAMERA.lookAt(new Vector3());

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
    this.history = new _History(this);
    this.storage = new _Storage();
    this.strings = new Strings(this.config);

    this.camera = _DEFAULT_CAMERA.clone();

    this.scene = new Scene();
    this.scene.name = "Scene";

    this.objects = {};
    this.geometries = {};
    this.material = {};
    this.textures = {};
    this.scripts = {};

    this.cameras = {};
    this.viewportCamera = this.camera;
    this.addCamera(this.camera);
  }
  setViewportCamera(uuid) {
    this.viewportCamera = this.cameras[uuid];
    this.signals.viewportCameraChanged.dispatch();
  }
  addCamera(camera) {
    if (camera.isCamera) {
      this.cameras[camera.uuid] = camera;
      this.signals.cameraAdded.dispatch(camera);
    }
  }
  addHelper(helper) {}
  selectByUuid(uuid) {}

  addObject(object, parent, index) {
    object.traverse((child) => {
      if (child.geometry) {
        this.addGeometry(child.geometry);
      }
      if (child.material) {
        this.addMaterial(child.material);
      }
      this.addCamera(child);
      this.addHelper(child);
    });
    if (parent) {
      parent.children.splice(index, 0, object);
      object.parent = parent;
    } else {
      this.scene.add(object);
    }
    this.signals.objectAdded.dispatch(object);
    this.signals.sceneGraphChanged.dispatch();
  }
  removeObject(object) {}
  addGeometry(geometry) {}
  addMaterial(material) {}

  select() {}
  deselect() {}
  clear() {}
  objectByUuid(uuid) {
    return this.scene.getObjectByProperty("uuid", uuid, true);
  }
  execute(cmd, optionalName) {
    this.history.execute(cmd, optionalName);
  }
  undo() {
    this.history.undo();
  }
  redo() {
    this.history.redo();
  }
  fromJSON() {}
  toJSON() {
    return {};
  }
}

export { Editor };
