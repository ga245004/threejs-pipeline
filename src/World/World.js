import { createCamera } from "./components/camera";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";

import { Resizer } from "./systems/Resizer";
import { createRenderer } from "./systems/renderer";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Loop } from "./systems/Loop";
import { Pipeline } from "./pipeline/pipeline";

class World {
  constructor(container) {
    this.container = container;
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.container.append(this.renderer.domElement);

    const light = createLights();

    this.loop = new Loop({
      camera: this.camera,
      renderer: this.renderer,
      scene: this.scene
    });
    this.scene.add(light);

    const resizer = new Resizer({
      container: this.container,
      camera: this.camera,
      renderer: this.renderer
    });
    resizer.onResize = () => {
      this.render();
    };

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.pipeline = new Pipeline({
      camera: this.camera,
      renderer: this.renderer
    });
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.pipeline.render();
  }
}

export { World };
