import "./styles.css";
import * as THREE from "three";
import { Editor } from "./Editor/Editor";
import { Viewport } from "./Editor/Viewport";
let isLoadingFromHash = false;
const editor = new Editor();
window.editor = editor;
window.THREE = THREE;

const viewport = new Viewport(editor);
document.body.appendChild(viewport.dom);

editor.storage.init().then(() => {
  editor.storage.get().then((state) => {
    if (isLoadingFromHash) return;

    if (state) {
      editor.fromJSON(state);
    }

    const selected = editor.config.getKey("selected");
    if (selected) {
      editor.selectByUuid(selected);
    }
  });

  let timeout;
  function saveState() {
    if (!editor.config.getKey("autosave")) return;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      editor.signals.savingStarted.dispatch();
      timeout = setTimeout(() => {
        editor.storage.set(editor.toJson());
        editor.signals.savingFinised.dispatch();
      }, 100);
    }, 1000);
  }

  editor.signals.geometryChanged.add(saveState);
  editor.signals.objectAdded.add(saveState);
  editor.signals.objectChanged.add(saveState);
  editor.signals.objectRemoved.add(saveState);
  editor.signals.materialChanged.add(saveState);
  editor.signals.sceneBackgroundChanged.add(saveState);
  editor.signals.sceneEnvironmentChanged.add(saveState);
  editor.signals.sceneFogChanged.add(saveState);
  editor.signals.sceneGraphChanged.add(saveState);
  editor.signals.scriptChanged.add(saveState);
  editor.signals.historyChanged.add(saveState);
});

function onWindowResize() {
  editor.signals.windowResize.dispatch();
}

window.addEventListener("resize", onWindowResize, false);
onWindowResize();

const hash = window.location.hash;
if (hash.substr(1, 5) === "file=") {
  const file = hash.substr(6);
  const isYes = window.confirm("Any unsaved data will be lost. Are you sure?");
  if (isYes) {
    const loader = new THREE.FileLoader();
    loader.crossOrigin = "";
    loader.load(file, (text) => {
      editor.clear();
      editor.fromJSON(JSON.parse(text));
    });
    isLoadingFromHash = true;
  }
}
