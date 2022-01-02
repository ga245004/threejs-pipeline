import { Color, Scene } from "three";

class Pipeline {
  constructor({ camera, renderer }) {
    this.camera = camera;
    this.renderer = renderer;
    const scene = new Scene();

    scene.background = new Color("gray");
    this.scene = scene;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export { Pipeline };
