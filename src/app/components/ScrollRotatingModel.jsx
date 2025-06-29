"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  MeshTransmissionMaterial,
  Text,
  Lightformer,
  useTexture,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import useIsMobile from "../hooks/useIsMobile";

const TEXTS = [
  { title: "Creativity", subtitle: "Creativity That Inspires" },
  { title: "Innovation", subtitle: "Technology That Keeps You Ahead" },
  {
    title: "Strategic Thinking",
    subtitle: "Strategy That Always Makes You Win",
  },
  { title: "Customer Centricity", subtitle: "Everything Is About “You”" },
];

const entryPositions = [
  [-20, 10, 10], // Top-Left
  [-30, -10, -5], // Top-Right
  [-30, 10, -2], // Bottom-Left
  [-30, -20, 25], // Bottom-Right
];

const getSegmentProgress = (
  globalProgress,
  index,
  total,
  startOffset = 0.15
) => {
  const rangeSize = (1 - startOffset) / total;
  const start = startOffset + index * rangeSize;
  const end = start + rangeSize;
  if (globalProgress < start) return 0;
  if (globalProgress > end) return 1;
  return (globalProgress - start) / rangeSize;
};

const useSquareExtrudeGeometry = (
  segments = 50,
  angle = Math.PI * 2,
  radius = 1.5,
  gap = 0.3
) =>
  useMemo(() => {
    const size = 0.3;
    const shape = new THREE.Shape();
    shape.moveTo(-size / 2, -size / 2);
    shape.lineTo(size / 2, -size / 2);
    shape.lineTo(size / 2, size / 2);
    shape.lineTo(-size / 2, size / 2);
    shape.lineTo(-size / 2, -size / 2);

    const path = new THREE.CurvePath();
    for (let i = 0; i < segments; i++) {
      const a1 = ((angle - gap) * i) / segments;
      const a2 = ((angle - gap) * (i + 1)) / segments;
      const p1 = new THREE.Vector3(
        Math.cos(-a1) * radius,
        Math.sin(-a1) * radius,
        0
      );
      const p2 = new THREE.Vector3(
        Math.cos(-a2) * radius,
        Math.sin(-a2) * radius,
        0
      );
      path.add(new THREE.LineCurve3(p1, p2));
    }

    return new THREE.ExtrudeGeometry(shape, {
      steps: segments,
      depth: 0,
      bevelEnabled: false,
      extrudePath: path,
    });
  }, [segments, angle, radius, gap]);

function GlassMaterial() {
  const texture = useTexture("/texture_1.jpg"); // Or any texture you want

  return (
    <MeshTransmissionMaterial
      transmission={1}
      thickness={0.1}
      ior={1}
      roughness={0}
      map={texture}
    />
  );
}

function Segment({ index, scrollYProgress, totalSegments = 4 }) {
  const meshRef = useRef();
  const geometry = useSquareExtrudeGeometry(50, (Math.PI * 2) / totalSegments);

  useFrame(() => {
    const globalProgress = scrollYProgress.current;
    const localProgress = getSegmentProgress(
      globalProgress,
      index,
      totalSegments
    );

    if (meshRef.current) {
      const show = localProgress > 0 && globalProgress < 0.99;
      meshRef.current.visible = show;

      if (show) {
        const start = new THREE.Vector3(...entryPositions[index]);
        meshRef.current.position.lerpVectors(
          start,
          new THREE.Vector3(0, 0, 0),
          localProgress
        );
        meshRef.current.rotation.z =
          -((Math.PI * 2) / totalSegments) * index + Math.PI;
        meshRef.current.scale.setScalar(
          THREE.MathUtils.lerp(0.4, 1, localProgress)
        );
      }
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <GlassMaterial />
    </mesh>
  );
}

function FullRing({ scrollYProgress, radius = 1.5 }) {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    // Define square cross-section
    const squareShape = new THREE.Shape();
    const size = 0.8;
    squareShape.moveTo(-size / 2, -size / 2);
    squareShape.lineTo(size / 2, -size / 2);
    squareShape.lineTo(size / 2, size / 2);
    squareShape.lineTo(-size / 2, size / 2);
    squareShape.lineTo(-size / 2, -size / 2);

    // Create circular path for extrusion
    const radius = 3.8;
    const curve = new THREE.CurvePath();
    const segments = 128;
    const circle = new THREE.Curve();
    circle.getPoint = (t) => {
      const angle = t * 2 * Math.PI;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
      );
    };

    // Create tube geometry with square shape
    return new THREE.ExtrudeGeometry(squareShape, {
      steps: segments,
      extrudePath: circle,
      curveSegments: 4,
    });
  }, []);

  useFrame(() => {
    const show = scrollYProgress.current > 0.99;
    if (meshRef.current) meshRef.current.visible = show;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} visible={false} scale={0.37}>
      <GlassMaterial />
    </mesh>
  );
}

function FoundationText({ index, scrollYProgress }) {
  const groupRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();

  useFrame(() => {
    const progress = getSegmentProgress(scrollYProgress.current, index, 4);
    const baseY = 6.8 - index * 3.2; // More vertical space between texts
    const appearY = THREE.MathUtils.lerp(baseY - 0.5, baseY, progress);
    const opacity = THREE.MathUtils.lerp(0, 1, progress);

    groupRef.current?.position.set(2.5, appearY, 0);
    titleRef.current.material.opacity = opacity;
    subtitleRef.current.material.opacity = opacity;
  });

  return (
    <group ref={groupRef}>
      <Text
        ref={titleRef}
        font="/fonts/PetrovSans-SemiBold.ttf"
        fontSize={1.2}
        color="#6210FF"
        anchorX="left"
        anchorY="top"
        material-transparent
      >
        {TEXTS[index].title}
      </Text>
      <Text
        ref={subtitleRef}
        font="/fonts/PetrovSans-Light.ttf"
        fontSize={0.4}
        color="#6210FF"
        anchorX="left"
        anchorY="top"
        position={[0, -1.6, 0]} // Fix spacing under large title
        material-transparent
      >
        {TEXTS[index].subtitle}
      </Text>
    </group>
  );
}

function FoundaionTitle({ scrollYProgress }) {
  const groupRef = useRef();
  const textRef = useRef();

  useFrame(() => {
    // Animate from 0 to 15% of scroll
    const progress = THREE.MathUtils.clamp(
      scrollYProgress.current / 0.15,
      0,
      1
    );
    const x = THREE.MathUtils.lerp(-18, -9, progress); // Animate X from left to center
    const opacity = THREE.MathUtils.lerp(0, 1, progress);

    if (groupRef.current) {
      groupRef.current.position.x = x;
    }

    if (textRef.current?.material) {
      textRef.current.material.opacity = opacity;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Text
        ref={textRef}
        font="/fonts/PetrovSans-SemiBold.ttf"
        fontSize={2.1}
        color="#6210FF"
        fontWeight={"bolder"}
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        lineHeight={1}
        material-transparent
      >
        Our{"\n"}Foundation
      </Text>
    </group>
  );
}

function RingGroup({ scrollYProgress }) {
  const groupRef = useRef();
  const isMobile = useIsMobile();
  const rotationTargetsRef = useRef([false, false, false, false]); // track rotation per segment
  const rotationProgressRef = useRef(0); // track ongoing rotation

  useFrame(() => {
    const totalSegments = 4;
    const scroll = scrollYProgress.current;

    // Total rotation = sum of per-segment progress * rotation per segment
    let totalRotation = 0;
    for (let i = 0; i < totalSegments; i++) {
      const localProgress = getSegmentProgress(scroll, i, totalSegments);
      totalRotation += localProgress;
    }

    const fullTurns = totalRotation * Math.PI * 2 * 0.25; // 1/4 speed
    if (groupRef.current) {
      groupRef.current.rotation.z = -fullTurns;
    }
  });

  return (
    <group
      ref={groupRef}
      rotation={
        isMobile
          ? [Math.PI / 2.2, -Math.PI / 10, 0]
          : [Math.PI / 3.5, -Math.PI / 10, 0]
      }
      position={isMobile ? [-0.6, 6.5, 0] : [-9, 0, 0]}
      scale={isMobile ? 1.8 : 3}
    >
      {[0, 1, 2, 3].map((i) => (
        <Segment key={i} index={i} scrollYProgress={scrollYProgress} />
      ))}
      <FullRing scrollYProgress={scrollYProgress} />
    </group>
  );
}

export default function ScrollRotatingModel({ scrollYProgress }) {
  const isMobile = useIsMobile();

  return (
    <Canvas style={{ background: "transparent" }}>
      <PerspectiveCamera
        makeDefault
        fov={75}
        position={isMobile ? [0, 0, 18] : [0, 0, 14]}
      >
        {(texture) => (
          <>
            <mesh position={[0, 0, -100]}>
              <planeGeometry args={[400, 400]} /> {/* Width, Height */}
              <meshBasicMaterial
                color={new THREE.Color("#eef0ff")}
                transparent
                opacity={1}
              />
            </mesh>

            <RingGroup scrollYProgress={scrollYProgress} />

            <group
              position={isMobile ? [5, 7, 0] : [0, 0, 0]}
              scale={isMobile ? 0.6 : 1}
            >
              <FoundaionTitle scrollYProgress={scrollYProgress} />
            </group>
            <group
              position={isMobile ? [-6, -4, 0] : [0, 0, 0]}
              scale={isMobile ? 0.7 : 1}
            >
              {[0, 1, 2, 3].map((i) => (
                <FoundationText
                  key={i}
                  index={i}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </group>
          </>
        )}
      </PerspectiveCamera>

      <Environment preset="city" background={true}>
        <Lightformer intensity={1} position={[10, 5, 0]} scale={[10, 50, 1]} />
      </Environment>
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
