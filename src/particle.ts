import { generateRandomColor, randint } from "./utils";

interface ParticleAttrs {
  color: string;
  strokeColor: string;
  strokeWidth: number;
}

export class Particle {
  private static particles: Particle[] = [];

  private x: number;
  private y: number;
  private size: number;
  private speed: { x: number; y: number };
  private attrs: ParticleAttrs;

  constructor(x: number, y: number) {
    Particle.particles.push(this);

    const angle = Math.random() * 2 * Math.PI;
    this.y = y;
    this.x = x;
    this.size = randint(5, 10);
    this.speed = {
      x: this.size * Math.cos(angle),
      y: this.size * Math.sin(angle),
    };
    this.attrs = {
      color: generateRandomColor(),
      strokeColor: generateRandomColor(),
      strokeWidth: randint(1, 5),
    };
  }

  public static getParticles() {
    return this.particles;
  }

  public update() {
    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.attrs.color;
    ctx.strokeStyle = this.attrs.strokeColor;
    ctx.lineWidth = this.attrs.strokeWidth;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}
