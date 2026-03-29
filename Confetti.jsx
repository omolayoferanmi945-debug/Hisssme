// Confetti.jsx
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Confetti({ count = 80 }) {
  const groupRef = useRef();

  // Random positions, colors, speed
  const particles = Array.from({ length: count }).map(() => ({
    position: [
      Math.random() * 10 - 5,
      Math.random() * 6,
      Math.random() * -5,
    ],
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    speed: Math.random() * 0.02 + 0.01,
    rotationSpeed: Math.random() * 0.02,
  }));

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, i) => {
      mesh.position.y -= particles[i].speed;
      mesh.rotation.x += particles[i].rotationSpeed;
      mesh.rotation.y += particles[i].rotationSpeed;
      if (mesh.position.y < -3) mesh.position.y = 6;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <boxGeometry args={[0.2, 0.2, 0.05]} />
          <meshStandardMaterial color={p.color} />
        </mesh>
      ))}
    </group>
  );
    }
