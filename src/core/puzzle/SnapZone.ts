import Phaser from "phaser";

export type SnapZoneConfig = {
  id: string;
  position: {
    x: number;
    y: number;
  };
  radius?: number;
};

export class SnapZone {
  public readonly id: string;
  public readonly x: number;
  public readonly y: number;
  public readonly radius: number;

  constructor(config: SnapZoneConfig) {
    this.id = config.id;
    this.x = config.position.x;
    this.y = config.position.y;
    this.radius = config.radius ?? 36;
  }

  contains(x: number, y: number) {
    return Phaser.Math.Distance.Between(this.x, this.y, x, y) <= this.radius;
  }
}
