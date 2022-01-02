import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

class RendererScene {
  constructor({ renderer }) {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    this.camera = camera;
    this.renderer = renderer;

    this.sceneRenderer = new THREE.Scene();
    this.sceneRenderer.background = new THREE.Color(0x4472c4);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    this.sceneRenderer.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.x += 0.5;
    this.cube = cube;
    this.sceneRenderer.add(cube);

    this.controls = new OrbitControls(camera, renderer.domElement);
  }

  update() {
    this.cube.rotation.y += 0.01;
    this.controls.update();
  }

  render() {
    this.renderer.render(this.sceneRenderer, this.camera);
  }
}

export default RendererScene;
