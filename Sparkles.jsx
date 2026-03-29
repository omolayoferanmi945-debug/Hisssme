// Sparkles.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Sparkles({ count = 60 }) {
  const groupRef = useRef();

  const sparkles = Array.from({ length: count }).map(() => ({
    position: [
      Math.random() * 6 - 3,
      Math.random() * 4 - 1,
      Math.random() * -3,
    ],
    speed: Math.random() * 0.02 + 0.01,
  }));

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((mesh, i) => {
      mesh.position.y += sparkles[i].speed;
      if (mesh.position.y > 3) mesh.position.y = -1;
    });
  });

  return (
    <group ref={groupRef}>
      {sparkles.map((s, i) => (
        <mesh key={i} position={s.position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#fffacd" emissive="#fffacd" />
        </mesh>
      ))}
    </group>
  );
  }
