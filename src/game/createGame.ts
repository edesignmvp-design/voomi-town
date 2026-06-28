import Phaser from "phaser";
import { BootScene } from "../scenes/BootScene";
import { BeaconAssemblyScene } from "../scenes/prototypes/BeaconAssemblyScene";
import { HomeScene } from "../scenes/HomeScene";

export function createGame(parent: HTMLElement) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 960,
    height: 540,
    backgroundColor: "#0b1016",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [BootScene, HomeScene, BeaconAssemblyScene],
  });
}
