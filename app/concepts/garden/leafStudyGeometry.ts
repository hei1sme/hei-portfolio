import * as THREE from "three";

// An authored botanical silhouette, not a plant scan. Lobes and fenestrations
// are deliberately irregular; both render modes sample the same surface.
export function leafOutline(variation: number) {
  const shape = new THREE.Shape();
  if (variation) {
    // A younger, still-unfurling blade gives the mature split leaf some space.
    shape.moveTo(0, 0);
    shape.bezierCurveTo(-.22, -.14, -.51, .04, -.48, .29);
    shape.bezierCurveTo(-.46, .55, -.21, .84, .015, 1.02);
    shape.bezierCurveTo(.19, .81, .45, .59, .48, .31);
    shape.bezierCurveTo(.53, .03, .20, -.13, 0, 0);
    return shape;
  }
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
  for (const [x, y, rx, ry, angle] of [
    [-.19, .18, .033, .056, -.65],
    [.21, .37, .027, .048, .45],
    [-.21, .46, .025, .052, -.6],
  ]) {
    const hole = new THREE.Path();
    hole.absellipse(x, y, rx, ry, 0, Math.PI * 2, true, angle);
    shape.holes.push(hole);
  }
  return shape;
}

export function leafPoint(x: number, y: number, length: number, width: number, variation: number) {
  const u = x * 2;
  const curl = variation ? 1.5 + .25 * y : .85 + .35 * y;
  const angle = u * curl;
  return new THREE.Vector3(
    Math.sin(angle) / curl * width * .5 + .07 * length * y * y * (variation ? -1 : 1),
    y * length - .06 * length * Math.pow(Math.abs(u), 2) * Math.sin(Math.PI * y),
    width * .5 * (1 - Math.cos(angle)) / curl
      + length * (.075 * Math.sin(Math.PI * y) - .19 * y * y * y
      + .035 * u * Math.sin(y * 4 + variation)
      + .008 * Math.exp(-u * u * 85) * Math.sin(Math.PI * y)),
  );
}

export function leafNormal(x: number, y: number, length: number, width: number, variation: number) {
  const point = leafPoint(x, y, length, width, variation);
  return leafPoint(x + .001, y, length, width, variation).sub(point)
    .cross(leafPoint(x, y + .001, length, width, variation).sub(point)).normalize();
}

function leafShell(front: THREE.BufferGeometry, shape: THREE.Shape, length: number, width: number, variation: number) {
  const thickness = .028;
  const back = front.clone();
  const backPositions = back.getAttribute("position");
  const normals = back.getAttribute("normal");
  for (let i = 0; i < backPositions.count; i++) {
    backPositions.setXYZ(i, backPositions.getX(i) - normals.getX(i) * thickness,
      backPositions.getY(i) - normals.getY(i) * thickness, backPositions.getZ(i) - normals.getZ(i) * thickness);
  }
  // A bevel follows both the outside edge and the fenestrations, joining front
  // and back continuously. It replaces the first trial's drawn perimeter tube.
  const positions: number[] = [], indices: number[] = [];
  for (const [contourIndex, path] of [shape, ...shape.holes].entries()) {
    const contour = path.getPoints(36);
    if (contour[0].distanceTo(contour[contour.length - 1]) < .00001) contour.pop();
    const count = contour.length;
    const signedArea = contour.reduce((area, p, i) => {
      const next = contour[(i + 1) % count]; return area + p.x * next.y - next.x * p.y;
    }, 0);
    const direction = (signedArea < 0 ? 1 : -1) * (contourIndex ? -1 : 1);
    const offset = positions.length / 3;
    for (let ring = 0; ring < 3; ring++) {
      contour.forEach((p, i) => {
        const normal = leafNormal(p.x, p.y, length, width, variation);
        const point = leafPoint(p.x, p.y, length, width, variation);
        const before = contour[(i + count - 1) % count], after = contour[(i + 1) % count];
        const tangent = leafPoint(after.x, after.y, length, width, variation)
          .sub(leafPoint(before.x, before.y, length, width, variation)).normalize();
        const outward = normal.clone().cross(tangent).multiplyScalar(direction);
        point.addScaledVector(normal, -thickness * ring / 2);
        if (ring === 1) point.addScaledVector(outward, .004);
        positions.push(point.x, point.y, point.z);
      });
    }
    for (let ring = 0; ring < 2; ring++) for (let i = 0; i < count; i++) {
      const a = offset + ring * count + i, b = offset + ring * count + (i + 1) % count;
      indices.push(a, a + count, b, b, a + count, b + count);
    }
  }
  const rim = new THREE.BufferGeometry();
  rim.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  rim.setIndex(indices); rim.computeVertexNormals();
  return { back, rim };
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
    const normal = leafNormal(p.x, p.y, length, width, variation);
    positions.push(point.x, point.y, point.z);
    normals.push(normal.x, normal.y, normal.z);
    blue.setRGB(.09 + .025 * p.y, .22 + .025 * p.y, .69 + .025 * p.y, THREE.SRGBColorSpace);
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
  return { geometry, shape, ...leafShell(geometry, shape, length, width, variation) };
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
