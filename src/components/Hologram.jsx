import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Text } from "@react-three/drei";
import { useRef } from "react";

function Core() {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.x = state.clock.elapsedTime * 0.25;
    ref.current.rotation.y = state.clock.elapsedTime * 0.45;
  });

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={2}
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh scale={0.7}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshBasicMaterial
          color="#a855f7"
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
}

function Ring({ rotation, scale, speed }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={ref} rotation={rotation} scale={scale}>
      <torusGeometry args={[2, 0.018, 16, 120]} />
      <meshBasicMaterial
        color="#22d3ee"
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function Node({ position, label, color }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.12;
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <Text
        position={[0, -0.32, 0]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.5} />

      <pointLight
        position={[3, 3, 3]}
        color="#22d3ee"
        intensity={8}
      />

      <pointLight
        position={[-3, -2, 2]}
        color="#a855f7"
        intensity={6}
      />

      <Float
        speed={1.5}
        rotationIntensity={0.35}
        floatIntensity={0.5}
      >
        <Core />

        <Ring
          rotation={[Math.PI / 2, 0, 0]}
          scale={1}
          speed={0.6}
        />

        <Ring
          rotation={[0, Math.PI / 2, 0]}
          scale={0.82}
          speed={-0.8}
        />

        <Ring
          rotation={[Math.PI / 3, Math.PI / 4, 0]}
          scale={1.15}
          speed={0.35}
        />

        <Node
          position={[2.2, 0.8, 0]}
          label="REACT"
          color="#61dafb"
        />

        <Node
          position={[-2.2, 0.5, 0]}
          label="NODE"
          color="#68a063"
        />

        <Node
          position={[0, -2.1, 0]}
          label="MONGO"
          color="#47a248"
        />

        <Node
          position={[1.4, 1.8, 0]}
          label="JS"
          color="#f7df1e"
        />
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.1}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.7}
      />
    </>
  );
}

export default function Hologram() {
  return (
    <div className="hologram-wrapper">
      <div className="hologram-label">
        <span />
        MERN CORE
      </div>

      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Scene />
      </Canvas>

      <div className="hologram-floor" />

      <div className="hologram-data">
        <span>REACT</span>
        <span>NODE</span>
        <span>EXPRESS</span>
        <span>MONGO</span>
      </div>
    </div>
  );
}