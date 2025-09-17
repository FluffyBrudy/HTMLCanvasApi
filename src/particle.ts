import { randint } from "./utils";

interface ParticleOptions {
  x: number;
  y: number;
  size?: number;
  speed?: { x: number; y: number };
  ignoreOutOfBound?: boolean;
}

export class Particle {
  public static hue = 0;
  private x: number;
  private y: number;
  private size: number;
  private speed: { x: number; y: number };
  private ignoreOutOfBound: boolean;

  constructor({
    x,
    y,
    size,
    speed,
    ignoreOutOfBound = false,
  }: ParticleOptions) {
    this.y = y;
    this.x = x;
    this.size = size || randint(1, 8);
    this.speed = speed || {
      x: Math.random() * 3 - 1.5,
      y: Math.random() * 3 - 1.5,
    };
    this.ignoreOutOfBound = ignoreOutOfBound;
  }

  public update() {
    this.x += this.speed.x;
    this.y += this.speed.y;
    this.size = Math.max(0, this.size - 0.1);
  }

  public getSize() {
    return this.size;
  }

  public isOutOfBound(width: number, height: number) {
    if (this.ignoreOutOfBound) return false;
    return (
      this.x < -this.size ||
      this.x > width + this.size ||
      this.y < -this.size ||
      this.y > height + this.size
    );
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `hsl(${Particle.hue},100%,65%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
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
    fromCenter?: number
  ) {
    this.particleGroup = new Set<Particle>();
    const originFrom = fromCenter || size * 2;
    for (let i = 0; i < 360; i += 45) {
      const radian = (i * Math.PI) / 180;

      const particle = new Particle({
        x: x + originFrom * Math.cos(radian),
        y: y + originFrom * Math.sin(radian),
        size,
        speed: {
          x: speed.x * Math.cos(radian),
          y: speed.y * Math.sin(radian),
        },
      });

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
      } else if (particle.getSize() <= 1) this.particleGroup.delete(particle);
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
