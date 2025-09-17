import { CircularPushedParticle } from "./particle";
import "./style.css";

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;
const mouse = { x: -1, y: -1 };

setAttrs(canvas);
window.onresize = () => setAttrs(canvas);
canvas.addEventListener("click", (e) => {
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
  new CircularPushedParticle(mouse.x, mouse.y, 5, { x: 5, y: 5 }, 1);
});

function main() {
  animate();
}

main();

function setAttrs(canvas: HTMLCanvasElement) {
  const minDimension = Math.min(window.innerWidth, window.innerHeight);
  canvas.width = minDimension;
  canvas.height = minDimension;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  ctx.fillStyle = "#000000";
  if (Math.random() < 0.5) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  CircularPushedParticle.getParticles().forEach((particle) => {
    particle.update(canvas.width, canvas.height);
    particle.draw(ctx);
  });
  requestAnimationFrame(animate);
}
