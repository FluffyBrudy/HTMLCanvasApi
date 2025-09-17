import { CircularPushedParticle, Particle } from "./particle";
import "./style.css";
import { randint } from "./utils";

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;
const mouse = { x: -1, y: -1 };
const particleArray = new Set<Particle>();

setAttrs(canvas);
window.onresize = () => setAttrs(canvas);
canvas.addEventListener("click", (e) => {
  setLocalMousePos(e);
  new CircularPushedParticle(mouse.x, mouse.y, 3, { x: 5, y: 5 }, 1);
  for (let i = 0; i < 5; i++) {
    particleArray.add(
      new Particle({
        x: mouse.x,
        y: mouse.y,
      })
    );
  }
});
canvas.addEventListener("mousemove", (e) => {
  setLocalMousePos(e);
  new CircularPushedParticle(mouse.x, mouse.y, 3, { x: 5, y: 5 }, 1);

  for (let i = 0; i < 5; i++) {
    particleArray.add(
      new Particle({
        x: mouse.x + randint(1, 5),
        y: mouse.y + randint(1, 5),
      })
    );
  }
});

function setAttrs(canvas: HTMLCanvasElement) {
  const minDimension = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = minDimension;
  canvas.height = minDimension;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setLocalMousePos(e: MouseEvent | PointerEvent) {
  const { left, top } = canvas.getBoundingClientRect();
  const localX = e.clientX - left;
  const localY = e.clientY - top;
  if (
    localX < 0 ||
    localX > canvas.width ||
    localY < 0 ||
    localY > canvas.height
  )
    return;
  mouse.x = localX;
  mouse.y = localY;
}

function animate() {
  Particle.hue = (Particle.hue + 2) % 360;
  console.log(Particle.hue);
  ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  CircularPushedParticle.getParticles().forEach((particle) => {
    particle.update(canvas.width, canvas.height);
    particle.draw(ctx);
  });
  handleParticles();
  requestAnimationFrame(animate);
}

function init() {
  for (let i = 0; i < 1; i++) {
    particleArray.add(new Particle({ x: mouse.x, y: mouse.y }));
  }
}

function handleParticles() {
  for (let particle of particleArray) {
    particle.update();
    particle.draw(ctx);
    if (particle.isOutOfBound(canvas.width, canvas.height)) {
      particleArray.delete(particle);
    } else if (particle.getSize() <= 0) [particleArray.delete(particle)];
  }
}

init();
animate();
