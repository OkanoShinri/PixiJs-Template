import * as PIXI from "pixi.js";
import { MyShip, Block } from "./GameObjects";

export const SceneIdx = {
  none: "none",
  quit_game_scene: "quit_game_scene",
  title_scene: "title_scene",
  play_game_scene: "play_game_scene",
} as const;

export type sceneIdx = typeof SceneIdx[keyof typeof SceneIdx];

export abstract class Scene {
  constructor() {}
  public update(delta: number) {}
  public keyPressed(event: Event) {}
  public keyReleased(event: Event) {}
  public finalize() {}
  public getNextScene(): sceneIdx {
    return SceneIdx.quit_game_scene;
  }
}

export class QuitScene extends Scene {
  constructor() {
    super();
  }
  public keyPressed(event: Event) {}
  public keyReleased(event: Event) {}
  public finalize() {}
  public getNextScene(): sceneIdx {
    return SceneIdx.none;
  }
}

export class TitleScene extends Scene {
  private app: PIXI.Application;
  private sprite: PIXI.Sprite;
  public next_scene: sceneIdx = SceneIdx.play_game_scene;

  constructor(app: PIXI.Application) {
    super();
    this.app = app;
    this.sprite = PIXI.Sprite.from("assets/img/Bison.png");

    this.sprite.anchor.set(0.5);

    this.sprite.x = this.app.screen.width / 2;
    this.sprite.y = this.app.screen.height / 2;

    this.app.stage.addChild(this.sprite);
  }
  public finalize() {
    this.sprite.destroy();
  }

  public update(delta: number) {
    this.sprite.x -= 3 * delta;
    if (this.sprite.x < -30) {
      this.sprite.x = this.app.screen.width;
    }
  }
  public keyPressed(event: Event) {}
  public keyReleased(event: Event) {}
  public getNextScene() {
    return this.next_scene;
  }
}

export class GameScene extends Scene {
  private app: PIXI.Application;
  public next_scene: sceneIdx = SceneIdx.none; //SceneIdx.quit_game_scene;
  private my_ship: MyShip;
  private block: Block;

  constructor(app: PIXI.Application) {
    super();
    this.app = app;

    this.my_ship = new MyShip(this.app);
    this.block = new Block(this.app);
  }
  public finalize() {
    this.my_ship.finalize();
    this.block.finalize();
  }

  public update(delta: number) {
    this.my_ship.update(delta);
    this.block.update(delta);
  }
  public keyPressed(event: KeyboardEvent) {
    this.my_ship.keyPressed(event);
  }
  public keyReleased(event: KeyboardEvent) {
    this.my_ship.keyReleased(event);
  }
  public getNextScene() {
    return this.next_scene;
  }
}
