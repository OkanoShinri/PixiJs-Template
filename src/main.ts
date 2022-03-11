import * as PIXI from "pixi.js";
import { SceneManager } from "./SceneManager";

const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const game = new SceneManager(app);

app.ticker.add((delta) => {
  game.update(delta);
});
