import * as THREE from "three";

// An authored botanical silhouette, not a plant scan. Lobes and fenestrations
// are deliberately irregular; both render modes sample the same surface.
export function leafOutline(variation: number) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(-.18, -.085, -.46, -.04, -.50, .12);
  shape.bezierCurveTo(-.56, .25, -.38, .29, -.17, .37);
  shape.bezierCurveTo(-.22, .39, -.41, .33, -.49, .36);
  shape.bezierCurveTo(-.56, .43, -.48, .55, -.39, .57);
  shape.bezierCurveTo(-.29, .60, -.18, .55, -.12, .61);
  shape.bezierCurveTo(-.19, .65, -.34, .60, -.38, .63);
  shape.bezierCurveTo(-.40, .70, -.28, .78, -.11, .79);
  shape.bezierCurveTo(-.15, .82, -.23, .77, -.24, .80);
  shape.bezierCurveTo(-.20, .88, -.06, .94, .015, 1.02);
  shape.bezierCurveTo(.08, .92, .22, .86, .27, .77);
  shape.bezierCurveTo(.30, .72, .15, .76, .11, .73);
  shape.bezierCurveTo(.16, .68, .34, .71, .39, .63);
  shape.bezierCurveTo(.46, .52, .40, .50, .17, .53);
  shape.bezierCurveTo(.12, .50, .43, .48, .49, .41);
  shape.bezierCurveTo(.54, .34, .47, .27, .39, .27);
  shape.bezierCurveTo(.30, .27, .20, .31, .15, .28);
  shape.bezierCurveTo(.24, .23, .47, .24, .49, .12);
  shape.bezierCurveTo(.51, -.045, .20, -.10, 0, 0);
  if (variation) {
    const seen = new Set<THREE.Vector2>();
    for (const curve of shape.curves) {
      if (!(curve instanceof THREE.CubicBezierCurve)) continue;
      for (const point of [curve.v0, curve.v1, curve.v2, curve.v3]) {
        if (seen.has(point)) continue;
        seen.add(point);
        point.x = point.x * (.96 + .1 * Math.sin(point.y * 5 + 1)) + .025 * Math.pow(Math.sin(point.y * Math.PI), 2);
        point.y += .018 * Math.sin(point.y * Math.PI * 2);
      }
    }
  }
  for (const [x, y, rx, ry, angle] of [
    [-.19, .18, .033, .056, -.65],
    [.21, .37, .027, .048, .45],
    [-.21, .46, .025, .052, -.6],
  ].slice(0, variation ? 2 : 3)) {
    const hole = new THREE.Path();
    hole.absellipse(x, y, rx, ry, 0, Math.PI * 2, true, angle);
    shape.holes.push(hole);
  }
  return shape;
}

export function leafPoint(x: number, y: number, length: number, width: number, variation: number) {
  const u = x * 2;
  return new THREE.Vector3(
    x * width * (1 + .055 * Math.sin(y * 9 + variation)),
    y * length,
    length * (.07 * Math.sin(Math.PI * y) + .15 * Math.pow(Math.abs(u), 1.15)
      - .15 * y * y * y + .03 * u * Math.sin(y * 4 + variation)
      + .008 * Math.exp(-u * u * 85) * Math.sin(Math.PI * y)),
  );
}

export function leafInterior(shape: THREE.Shape) {
  const outline = shape.extractPoints(24);
  const inside = (point: THREE.Vector2, polygon: THREE.Vector2[]) => {
    let result = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const a = polygon[i], b = polygon[j];
      if ((a.y > point.y) !== (b.y > point.y)
        && point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x) result = !result;
    }
    return result;
  };
  return (point: THREE.Vector2) => inside(point, outline.shape) && !outline.holes.some(hole => inside(point, hole));
}

export function createLeafGeometry(length: number, width: number, variation: number) {
  const shape = leafOutline(variation);
  const flat = new THREE.ShapeGeometry(shape, 16);
  const flatPositions = flat.getAttribute("position");
  const flatIndex = flat.getIndex()!;
  const positions: number[] = [], normals: number[] = [], colors: number[] = [];
  const blue = new THREE.Color();
  const vertex = (p: THREE.Vector2) => {
    const point = leafPoint(p.x, p.y, length, width, variation);
    const dx = leafPoint(p.x + .001, p.y, length, width, variation).sub(point);
    const dy = leafPoint(p.x, p.y + .001, length, width, variation).sub(point);
    const normal = dx.cross(dy).normalize();
    positions.push(point.x, point.y, point.z);
    normals.push(normal.x, normal.y, normal.z);
    blue.setRGB(.055 + .02 * p.y, .18 + .025 * p.y, .73 + .025 * p.y, THREE.SRGBColorSpace);
    colors.push(blue.r, blue.g, blue.b);
  };
  const subdivide = (a: THREE.Vector2, b: THREE.Vector2, c: THREE.Vector2, depth: number) => {
    const edges = [a.distanceToSquared(b), b.distanceToSquared(c), c.distanceToSquared(a)];
    const longest = Math.max(...edges);
    if (depth >= 9 || longest < .0036) { vertex(a); vertex(b); vertex(c); return; }
    const side = edges.indexOf(longest);
    const points = [a, b, c];
    const left = points[side], right = points[(side + 1) % 3], opposite = points[(side + 2) % 3];
    const middle = left.clone().add(right).multiplyScalar(.5);
    subdivide(left, middle, opposite, depth + 1);
    subdivide(middle, right, opposite, depth + 1);
  };
  for (let i = 0; i < flatIndex.count; i += 3) {
    const read = (index: number) => new THREE.Vector2(flatPositions.getX(index), flatPositions.getY(index));
    subdivide(read(flatIndex.getX(i)), read(flatIndex.getX(i + 1)), read(flatIndex.getX(i + 2)), 0);
  }
  flat.dispose();
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  return { geometry, shape };
}

export function sampleLeafPoints(surface: THREE.BufferGeometry, count: number, seed: number) {
  const source = surface.getAttribute("position");
  const weights: number[] = [];
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  let total = 0;
  for (let i = 0; i < source.count; i += 3) {
    a.fromBufferAttribute(source, i); b.fromBufferAttribute(source, i + 1); c.fromBufferAttribute(source, i + 2);
    total += b.sub(a).cross(c.sub(a)).length() / 2;
    weights.push(total);
  }
  const hash = (n: number) => { const value = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453; return value - Math.floor(value); };
  const positions = new Float32Array(count * 3), starts = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const target = hash(i * 7 + 1) * total;
    let low = 0, high = weights.length - 1;
    while (low < high) { const middle = (low + high) >>> 1; if (weights[middle] < target) low = middle + 1; else high = middle; }
    const triangle = low * 3;
    a.fromBufferAttribute(source, triangle); b.fromBufferAttribute(source, triangle + 1); c.fromBufferAttribute(source, triangle + 2);
    const u = Math.sqrt(hash(i * 7 + 2)), v = hash(i * 7 + 3);
    a.multiplyScalar(1 - u).addScaledVector(b, u * (1 - v)).addScaledVector(c, u * v);
    positions.set([a.x, a.y, a.z], i * 3);
    starts.set([(hash(i * 7 + 4) - .5) * 5, hash(i * 7 + 5) * 4 - .2, (hash(i * 7 + 6) - .5) * 2.8], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aStart", new THREE.BufferAttribute(starts, 3));
  return geometry;
}
