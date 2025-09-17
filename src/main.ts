import { Particle } from "./particle";
import "./style.css";

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;
const mouse = { x: -1, y: -1 };

setAttrs(canvas);
window.onresize = () => setAttrs(canvas);
window.addEventListener("click", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  new Particle(mouse.x, mouse.y);
});

function main() {
  animate();
}

main();

function setAttrs(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  Particle.getParticles().forEach((particle) => {
    particle.update();
    particle.draw(ctx);
  });
  requestAnimationFrame(animate);
}
