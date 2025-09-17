import { generateRandomColor, randint } from "./utils";

export class Particle {
  private x: number;
  private y: number;
  private initPos: { x: number; y: number };
  private size: number;
  private speed: { x: number; y: number };
  private color: string;
  private strokeColor: string;
  private strokeWidth: number;

  constructor(
    x: number,
    y: number,
    size?: number,
    speed?: { x: number; y: number },
    color?: string,
    strokeColor?: string,
    strokeWidth?: number
  ) {
    const angle = Math.random() * 2 * Math.PI;
    this.y = y;
    this.x = x;
    this.initPos = { x, y };
    this.size = size || randint(5, 10);
    this.speed = speed || {
      x: this.size * Math.cos(angle),
      y: this.size * Math.sin(angle),
    };
    this.color = color || generateRandomColor();
    this.strokeColor = strokeColor || generateRandomColor();
    this.strokeWidth = strokeWidth || randint(1, 5);
  }

  public update() {
    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  public isOutOfBound(width: number, height: number) {
    return (
      this.x < -this.size ||
      this.x > width + this.size ||
      this.y < -this.size ||
      this.y > height + this.size
    );
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.strokeWidth;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.lineTo(this.initPos.x, this.initPos.y);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}

export class CircularPushedParticle {
  private static particles: CircularPushedParticle[] = [];
  private particleGroup: Set<Particle>;

  constructor(
    x: number,
    y: number,
    size: number,
    speed: { x: number; y: number },
    strokeWidth: number,
    fromCenter?: number,
    color?: string,
    strokeColor?: string
  ) {
    this.particleGroup = new Set<Particle>();
    const originFrom = fromCenter || size * 2;
    for (let i = 0; i < 360; i += 10) {
      const radian = (i * Math.PI) / 180;
      const particle = new Particle(
        x + originFrom * Math.cos(radian),
        y + originFrom * Math.sin(radian),
        size,
        { x: speed.x * Math.cos(radian), y: speed.y * Math.sin(radian) },
        color || generateRandomColor(),
        strokeColor || generateRandomColor(),
        strokeWidth
      );
      this.particleGroup.add(particle);
    }
    CircularPushedParticle.particles.push(this);
  }

  public static getParticles() {
    return this.particles;
  }

  public getGroupParticles() {
    return this.particleGroup;
  }

  public update(width: number, height: number) {
    for (let particle of this.particleGroup) {
      particle.update();
      if (particle.isOutOfBound(width, height)) {
        this.particleGroup.delete(particle);
      }
    }

    CircularPushedParticle.particles = CircularPushedParticle.particles.filter(
      (particle) => particle.particleGroup.size > 0
    );
  }

  public draw(ctx: CanvasRenderingContext2D) {
    for (let particle of this.particleGroup) {
      particle.draw(ctx);
    }
  }
}
