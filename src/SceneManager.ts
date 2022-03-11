import * as PIXI from "pixi.js";
import {
  Scene,
  SceneIdx,
  sceneIdx,
  TitleScene,
  QuitScene,
  GameScene,
} from "./Scene";

export class SceneManager {
  private app: PIXI.Application;
  private current_scene: Scene;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.current_scene = this.scene_factory(SceneIdx.play_game_scene);
    document.addEventListener("keydown", (event) => {
      this.keyPressed(event);
    });
    document.addEventListener("keyup", (event) => {
      this.keyReleased(event);
    });
    document.addEventListener("click", (event) => {
      this.changeScene();
    });
  }

  public update(delta: number) {
    this.current_scene.update(delta);
  }

  public keyPressed(event: Event) {
    this.current_scene.keyPressed(event);
  }

  public keyReleased(event: Event) {
    this.current_scene.keyReleased(event);
  }

  public changeScene() {
    if (this.current_scene.getNextScene() == SceneIdx.none) {
      return;
    }
    this.current_scene.finalize();
    this.current_scene = this.scene_factory(this.current_scene.getNextScene());
  }

  private scene_factory(idx: sceneIdx): Scene {
    switch (idx) {
      case SceneIdx.title_scene:
        return new TitleScene(this.app);
      case SceneIdx.quit_game_scene:
        return new QuitScene();
      case SceneIdx.play_game_scene:
        return new GameScene(this.app);
      default:
        return new QuitScene();
    }
  }
}
