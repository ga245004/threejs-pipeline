import { UIPanel } from "./../libs/ui";
import { GridHelper, Group, PMREMGenerator, AlwaysDepth } from "three";
import { ViewportCamera } from "./Viewport.Camera";
import { ViewHelper } from "./Viewport.ViewHelper";
class Viewport {
  constructor(editor) {
    this.editor = editor;

    this.container = new UIPanel();
    this.container.addClass("Viewport");
    this.dom = this.container.dom;
    this.container.setId("viewport");
    this.container.setPosition("absolute");

    this.container.add(new ViewportCamera(editor).container);
    this.container.add(new ViewHelper(editor).container);

    this.scene = this.editor.scene;
    this.renderer = null;
    this.pmremGenerator = null;
    this.startTime = 0;
    this.endTime = 0;

    this.grid = new Group();
    const grid1 = new GridHelper(30, 30, 0x888888);
    grid1.material.color.setHex(0x888888);
    grid1.material.vertexColors = false;
    this.grid.add(grid1);
    this.grid1 = grid1;

    var grid2 = new GridHelper(30, 6, 0x222222);
    grid2.material.color.setHex(0x222222);
    grid2.material.depthFunc = AlwaysDepth;
    grid2.material.vertexColors = false;
    this.grid.add(grid2);
    this.grid2 = grid2;

    this.editor.signals.rendererCreated.add((newRenderer) => {
      this.setRenderer(newRenderer);
    });
    this.editor.signals.showGridChanged.add((showGrid) => {
      this.showGridChanged(showGrid);
    });
    this.editor.signals.showHelpersChanged.add((showHelpers) => {
      this.showHelpersChanged(showHelpers);
    });
  }

  animate() {}

  showGridChanged(showGrid) {
    this.grid.visible = showGrid;
    this.render();
  }

  showHelpersChanged(showHelpers) {
    this.render();
  }

  setRenderer(newRenderer) {
    if (this.renderer) {
      this.renderer.setAnimationLoop(null);
      this.renderer.dispose();
      this.pmremGenerator.dispose();
      this.container.dom.removeChild(this.renderer.domElement);
    }
    this.renderer = newRenderer;

    this.renderer.setAnimationLoop(() => {
      this.animate();
    });
    this.renderer.setClearColor(0xaaaaaa);

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      mediaQuery.addListener((event) => {
        this.renderer.setClearColor(event.matches ? 0x333333 : 0xaaaaaa);
        updateGridColors(
          this.grid1,
          this.grid2,
          event.matches ? [0x222222, 0x888888] : [0x888888, 0x282828]
        );

        this.render();
      });
    }

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      this.container.dom.offsetWidth,
      this.container.dom.offsetHeight
    );

    this.pmremGenerator = new PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();

    this.container.dom.appendChild(this.renderer.domElement);

    this.render();
  }

  render() {
    this.startTime = performance.now();
    this.scene.add(this.grid);
    this.renderer.setViewport(
      0,
      0,
      this.container.dom.offsetWidth,
      this.container.dom.offsetHeight
    );
    this.renderer.render(this.scene, this.editor.viewportCamera);
    this.scene.remove(this.grid);
    this.endTime = performance.now();
    this.editor.signals.sceneRendered.dispatch(this.endTime - this.startTime);
  }
}

function updateGridColors(grid1, grid2, colors) {
  grid1.material.color.setHex(colors[0]);
  grid2.material.color.setHex(colors[1]);
}

export { Viewport };
