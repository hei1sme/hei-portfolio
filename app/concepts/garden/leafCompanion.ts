import * as THREE from "three";

// Small, authored 3D companion: the same ivory / blue running-kit idea as the
// existing mascot, modelled here so it shares the sculpture's light and shadows.
export function createLeafCompanion() {
  const group = new THREE.Group();
  const torso = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];
  const materials = {
    ivory: new THREE.MeshStandardMaterial({ color: 0xf2ead5, roughness: .78 }),
    blue: new THREE.MeshStandardMaterial({ color: 0x2452c6, roughness: .65 }),
    orange: new THREE.MeshStandardMaterial({ color: 0xe4a047, roughness: .85 }),
    ink: new THREE.MeshStandardMaterial({ color: 0x152344, roughness: .8 }),
  };
  group.add(torso);
  const mesh = (geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Group) => {
    geometries.push(geometry);
    const node = new THREE.Mesh(geometry, material);
    node.castShadow = true; node.receiveShadow = true;
    parent.add(node);
    return node;
  };
  const oval = (parent: THREE.Group, material: THREE.Material, at: number[], scale: number[]) => {
    const node = mesh(new THREE.SphereGeometry(1, 24, 18), material, parent);
    node.position.set(...at as [number,number,number]);
    node.scale.set(...scale as [number,number,number]);
    return node;
  };
  oval(torso, materials.ivory, [0,0,0], [.19,.19,.15]);
  oval(torso, materials.blue, [.025,.025,.105], [.15,.15,.065]);
  oval(torso, materials.ivory, [.025,.18,0], [.075,.13,.075]);
  const head = new THREE.Group(); head.position.set(.045,.30,.015); torso.add(head);
  oval(head, materials.ivory, [0,0,0], [.14,.145,.125]);
  oval(head, materials.orange, [.15,-.025,.015], [.12,.032,.09]);
  oval(head, materials.ink, [.065,.025,.105], [.012,.015,.008]);
  oval(head, materials.ink, [.065,.025,-.105], [.012,.015,.008]);
  const headband = mesh(new THREE.TorusGeometry(.126,.012,7,40), materials.blue, head);
  headband.rotation.x = Math.PI / 2; headband.position.y = .06;
  oval(head, materials.blue, [.10,.061,.01], [.12,.012,.11]);
  const tail = mesh(new THREE.ConeGeometry(.064,.16,16), materials.ivory, torso);
  tail.position.set(-.18,.015,-.01); tail.rotation.z = Math.PI / 2 + .3;
  const wings = [-1,1].map(side => {
    const wing = new THREE.Group(); wing.position.set(-.015,.045,side*.135); torso.add(wing);
    const feather = oval(wing, materials.ivory, [-.015,-.055,0], [.07,.12,.03]);
    feather.rotation.z = -.35;
    return wing;
  });
  const legs = [-1,1].map(side => {
    const leg = new THREE.Group(); leg.position.set(0,-.14,side*.075); group.add(leg);
    const shin = mesh(new THREE.CylinderGeometry(.019,.016,.12,10), materials.orange, leg);
    shin.position.y = -.045;
    oval(leg, materials.ivory, [.045,-.105,.008], [.09,.043,.055]);
    oval(leg, materials.blue, [.045,-.136,.008], [.092,.012,.057]);
    return leg;
  });
  group.rotation.y = -.25;
  return {
    group,
    update(time: number, animated: boolean, running: boolean) {
      const phase = time * 11;
      const stride = animated && running ? Math.sin(phase) : 0;
      legs[0].rotation.z = stride * .7;
      legs[1].rotation.z = -stride * .7;
      wings[0].rotation.z = -.1 - stride * .45;
      wings[1].rotation.z = -.1 + stride * .45;
      torso.position.y = animated && running ? Math.abs(stride) * .025 : 0;
      torso.scale.y = 1 + (animated && !running ? Math.sin(time * 2.8) * .018 : 0);
      head.rotation.z = animated && running ? Math.sin(phase) * .035 : -.035;
    },
    dispose() {
      geometries.forEach(geometry => geometry.dispose());
      Object.values(materials).forEach(material => material.dispose());
    },
  };
}
