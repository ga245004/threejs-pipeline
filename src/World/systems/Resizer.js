class Resizer {
  constructor({ container, camera, renderer }) {
    this.container = container;
    this.camera = camera;
    this.renderer = renderer;
    this.setSize();
    window.addEventListener("resize", () => {
      this.setSize();
      this.onResize();
    });
  }

  setSize() {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  onResize() {}
}

export { Resizer };
