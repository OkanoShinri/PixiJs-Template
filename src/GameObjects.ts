import * as PIXI from "pixi.js";

class Pos {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  w: number;
  h: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.w = 0;
    this.h = 0;
  }
}

export class MyShip {
  private app: PIXI.Application;
  private sprite: PIXI.Sprite;
  private is_moving: boolean[];
  private moveing_counter: number[];
  private pos: Pos;

  constructor(app: PIXI.Application) {
    this.app = app;

    this.pos = new Pos();
    this.pos.x = this.app.screen.width / 2;
    this.pos.y = this.app.screen.height / 2;
    this.pos.ay = 0.5;

    this.sprite = PIXI.Sprite.from("assets/img/Bison.png");
    this.sprite.anchor.set(0.5);
    this.sprite.x = this.pos.x;
    this.sprite.y = this.pos.y;
    this.app.stage.addChild(this.sprite);

    this.is_moving = [false, false, false, false];
    this.moveing_counter = [0, 0, 0, 0];
  }
  public finalize() {
    this.sprite.destroy();
  }

  public update(delta: number) {
    this.updateMoveCounter();
    let speed: number = 5 * delta;

    //up
    if (this.moveing_counter[0] == 1) {
      this.pos.vy = -12;
    }
    //left
    if (this.is_moving[2]) {
      this.pos.x -= speed;
    }
    //right
    if (this.is_moving[3]) {
      this.pos.x += speed;
    }

    //gravity
    this.pos.vy += this.pos.ay;
    this.pos.y += this.pos.vy;

    if (this.pos.x > this.app.screen.width) {
      this.pos.x = this.app.screen.width;
    }
    if (this.pos.x < 0) {
      this.pos.x = 0;
    }
    if (this.pos.y > this.app.screen.height - 30) {
      this.pos.y = this.app.screen.height - 30;
    }
    if (this.pos.y < 0) {
      this.pos.y = 0;
      this.pos.vy = 0;
    }

    this.sprite.x = this.pos.x;
    this.sprite.y = this.pos.y;
  }
  private updateMoveCounter() {
    if (this.is_moving[0]) {
      this.moveing_counter[0]++;
    } else {
      this.moveing_counter[0] = 0;
    }
    if (this.is_moving[1]) {
      this.moveing_counter[1]++;
    } else {
      this.moveing_counter[1] = 0;
    }
    if (this.is_moving[2]) {
      this.moveing_counter[2]++;
    } else {
      this.moveing_counter[2] = 0;
    }
    if (this.is_moving[3]) {
      this.moveing_counter[3]++;
    } else {
      this.moveing_counter[3] = 0;
    }
  }
  public keyPressed(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
      case "w":
      case " ":
        this.is_moving[0] = true;
        break;
      case "ArrowDown":
      case "s":
        this.is_moving[1] = true;
        break;
      case "ArrowLeft":
      case "a":
        this.is_moving[2] = true;
        break;
      case "ArrowRight":
      case "d":
        this.is_moving[3] = true;
        break;
    }
  }
  public keyReleased(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
      case "w":
      case " ":
        this.is_moving[0] = false;
        break;
      case "ArrowDown":
      case "s":
        this.is_moving[1] = false;
        break;
      case "ArrowLeft":
      case "a":
        this.is_moving[2] = false;
        break;
      case "ArrowRight":
      case "d":
        this.is_moving[3] = false;
        break;
    }
  }
}

export class Block {
  private app: PIXI.Application;
  private sprite: PIXI.Sprite;
  private pos: Pos;

  constructor(app: PIXI.Application) {
    this.app = app;

    this.pos = new Pos();
    this.pos.x = this.app.screen.width / 2;
    this.pos.y = this.app.screen.height / 2;
    this.pos.w = 80;
    this.pos.h = 80;

    this.sprite = PIXI.Sprite.from("assets/img/block.png");
    this.sprite.anchor.set(0.5);
    this.sprite.x = this.pos.x;
    this.sprite.y = this.pos.y;
    this.app.stage.addChild(this.sprite);
  }
  public finalize() {
    this.sprite.destroy();
  }

  public update(delta: number) {}
  public keyPressed(event: KeyboardEvent) {}
  public keyReleased(event: KeyboardEvent) {}
}
