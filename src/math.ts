export function getQuadrantAngle(radian: number) {
  const x = Math.sign(Math.cos(radian));
  const y = Math.sign(Math.sin(radian));
  return { x, y };
}
