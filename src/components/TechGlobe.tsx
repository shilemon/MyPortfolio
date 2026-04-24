import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const techLogos = [
  'AWS', 'K8s', 'Docker', 'Jenkins', 'Git',
  'Linux', 'Terraform', 'Grafana', 'Prometheus', 'Nginx',
  'Ansible', 'Helm', 'Azure', 'Trivy', 'ArgoCD'
];

const TechGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Create globe sphere wireframe
    const sphereGeo = new THREE.SphereGeometry(3, 24, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Glowing core
    const coreGeo = new THREE.SphereGeometry(0.3, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.8 });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Place dots on sphere surface at fibonacci spiral positions
    const dotGroup = new THREE.Group();
    const dotCount = techLogos.length;

    for (let i = 0; i < dotCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotCount);
      const theta = Math.sqrt(dotCount * Math.PI) * phi;

      const dotGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x6366f1 : i % 3 === 1 ? 0x38bdf8 : 0xffffff,
        transparent: true,
        opacity: 0.9,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);

      dot.position.setFromSphericalCoords(3, phi, theta);
      dotGroup.add(dot);

      // Connecting line from core to dot
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        dot.position.clone(),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.15,
      });
      dotGroup.add(new THREE.Line(lineGeo, lineMat));
    }
    scene.add(dotGroup);

    // Orbit rings
    for (let r = 0; r < 3; r++) {
      const ringGeo = new THREE.RingGeometry(3.5 + r * 0.4, 3.52 + r * 0.4, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / (2 + r);
      ring.rotation.y = r * 0.5;
      scene.add(ring);
    }

    camera.position.z = 7;

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      sphere.rotation.y += 0.003;
      dotGroup.rotation.y += 0.004;
      dotGroup.rotation.x += 0.001;
      core.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.2);

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default TechGlobe;