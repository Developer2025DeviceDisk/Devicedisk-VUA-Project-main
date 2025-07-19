"use client";
import React, { useEffect } from "react";
import { MeshTransmissionMaterial, useGLTF, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const staticProps = {
  thickness: 0.2,
  roughness: 0.2,
  transmission: 1,
  ior: 1.8,
  chromaticAberration: 0.02,
  backside: true,
  scale: 1.56,
  rotationX: 348,
  rotationY: 100,
  rotationZ: 360,
  positionX: 0.2,
  positionY: -4,
  positionZ: 2.0,
  text1PosX: -2,
  text1PosY: 0.6,
  text1PosZ: -2,
  text1RotX: 0,
  text1RotY: 45,
  text1RotZ: 0,
  text1FontSize: 0.8,
  text1Color: "#ffffff",
  text2PosX: -2,
  text2PosY: -0.1,
  text2PosZ: -2,
  text2RotX: 0,
  text2RotY: 45,
  text2RotZ: 0,
  text2FontSize: 0.8,
  text2Color: "#ffffff",
};

export const GlassModel = ({
  modalGroupRef,
  torus,
  torus001,
  torus002,
  torus003,
  foundationTitleRef,
  foundationTitleTopRef,
  foundationTitleBottomRef,
}: any) => {
  const { nodes } = useGLTF("/ring10.glb");
  const { invalidate } = useThree();

  const isDesktop = useMediaQuery("min-width", 920) as any;

  useEffect(() => {
    invalidate();
  }, [isDesktop, invalidate]);

  // Transmission material props
  const transmissionMaterialProps = {
    thickness: 0,
    roughness: 0.0,
    transmission: 1,
    ior: 3.0,
    chromaticAberration: 0.2,
    backside: false,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
    anisotropy: 16,
    flipY: false,
    generateMipmaps: true,
    premultiplyAlpha: false,
    unpackAlignment: 4,
    userData: {
      // Caustics simulation parameters
      causticsIntensity: 0.8,
      causticsScale: 2.5,
      causticsSpeed: 0.1,
      // Dispersion effect parameters
      dispersionStrength: 0.15,
      dispersionSamples: 8,
      // Volumetric fog integration
      fogDensity: 0.02,
      fogColor: [0.1, 0.3, 0.8],
      // Surface micro-displacement
      displacementScale: 0.001,
      displacementBias: 0.0,
      // Advanced reflection parameters
      reflectionMixing: 0.9,
      reflectionBlur: 0.1,
      environmentIntensity: 1.2,
    },
  };

  const textControls = {
    positionX: -40,
    positionY: 4.2,
    positionZ: -0.3,
    rotationX: 0,
    rotationY: 45,
    rotationZ: 0,
    scale: 2.7,
  };

  const text2Controls = {
    positionX: -40,
    positionY: 2.1,
    positionZ: -3.7,
    rotationX: 0,
    rotationY: 45,
    rotationZ: 0,
    scale: 3,
  };

  const groupControls = isDesktop
    ? {
        positionX: -13,
        positionY: 0,
        positionZ: 0,
        rotationX: -44,
        rotationY: -180,
        rotationZ: -3,
        scale: 0.85,
      }
    : {
        positionX: 0,
        positionY: 4.5,
        positionZ: 0,
        rotationX: -44,
        rotationY: -180,
        rotationZ: -3,
        scale: 0.6,
      };

  const torus001Controls = {
    positionX: -1.0,
    positionY: -25,
    positionZ: 1.0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  };

  const torus002Controls = {
    positionX: -1.0,
    positionY: 0,
    positionZ: -30,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  };

  const torus003Controls = {
    positionX: 1.0,
    positionY: 30,
    positionZ: -1.0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  };

  const torusControls = {
    positionX: 1.0,
    positionY: -30,
    positionZ: 1.0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  };

  const textGroupControls = {
    positionX: 27.0,
    positionY: -3.0,
    positionZ: 10.5,
    opacity: 1.0,
    visible: true,
  };

  const rootGroupControls = isDesktop
    ? {
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 0.2,
      }
    : {
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scale: 0.12,
      };

  return (
    <group
      scale={rootGroupControls.scale}
      position={[
        rootGroupControls.positionX,
        rootGroupControls.positionY,
        rootGroupControls.positionZ,
      ]}
      rotation={[
        THREE.MathUtils.degToRad(rootGroupControls.rotationX),
        THREE.MathUtils.degToRad(rootGroupControls.rotationY),
        THREE.MathUtils.degToRad(rootGroupControls.rotationZ),
      ]}
    >
      {isDesktop && (
        <group
          scale={1}
          ref={foundationTitleRef}
          position={[
            textGroupControls.positionX,
            textGroupControls.positionY,
            textGroupControls.positionZ,
          ]}
          visible={textGroupControls.visible}
        >
          <Text
            position={[
              textControls.positionX,
              textControls.positionY,
              textControls.positionZ,
            ]}
            fontSize={isDesktop ? staticProps.text1FontSize : 0.6}
            fontWeight={400}
            font="/fonts/PetrovSans-Regular.ttf"
            scale={textControls.scale}
            rotation={[
              THREE.MathUtils.degToRad(textControls.rotationX),
              THREE.MathUtils.degToRad(textControls.rotationY),
              THREE.MathUtils.degToRad(textControls.rotationZ),
            ]}
            color={staticProps.text1Color}
            anchorX="center"
            anchorY="middle"
          >
            <meshBasicMaterial
              color={staticProps.text1Color}
              transparent={true}
              opacity={0}
              ref={foundationTitleTopRef}
            />
            Our
          </Text>

          <Text
            position={[
              text2Controls.positionX,
              text2Controls.positionY,
              text2Controls.positionZ,
            ]}
            fontSize={isDesktop ? staticProps.text2FontSize : 0.6}
            fontWeight={400}
            scale={text2Controls.scale}
            font="/fonts/PetrovSans-Regular.ttf"
            rotation={[
              THREE.MathUtils.degToRad(text2Controls.rotationX),
              THREE.MathUtils.degToRad(text2Controls.rotationY),
              THREE.MathUtils.degToRad(text2Controls.rotationZ),
            ]}
            color={staticProps.text2Color}
            anchorX="center"
            anchorY="middle"
          >
            <meshBasicMaterial
              color={staticProps.text2Color}
              transparent={true}
              opacity={0}
              ref={foundationTitleBottomRef}
            />
            Foundation
          </Text>
        </group>
      )}

      <group
        ref={modalGroupRef}
        scale={groupControls.scale}
        position={[
          groupControls.positionX,
          groupControls.positionY,
          groupControls.positionZ,
        ]}
        rotation={[
          THREE.MathUtils.degToRad(groupControls.rotationX),
          THREE.MathUtils.degToRad(groupControls.rotationY),
          THREE.MathUtils.degToRad(groupControls.rotationZ),
        ]}
      >
        <mesh
          ref={torus001}
          {...nodes.Ring}
          renderOrder={1}
          position={[
            torus001Controls.positionX,
            torus001Controls.positionY,
            torus001Controls.positionZ,
          ]}
          rotation={[
            THREE.MathUtils.degToRad(torus001Controls.rotationX),
            THREE.MathUtils.degToRad(torus001Controls.rotationY),
            THREE.MathUtils.degToRad(torus001Controls.rotationZ),
          ]}
        >
          {/* {useTransmissionMaterial ? ( */}
          <MeshTransmissionMaterial {...transmissionMaterialProps} />
          {/* ) : (
            <meshPhysicalMaterial {...physicalMaterialProps} />
          )} */}
        </mesh>

        <mesh
          ref={torus002}
          {...nodes.Ring001}
          renderOrder={2}
          position={[
            torus002Controls.positionX,
            torus002Controls.positionY,
            torus002Controls.positionZ,
          ]}
          rotation={[
            THREE.MathUtils.degToRad(torus002Controls.rotationX),
            THREE.MathUtils.degToRad(torus002Controls.rotationY),
            THREE.MathUtils.degToRad(torus002Controls.rotationZ),
          ]}
        >
          <MeshTransmissionMaterial {...transmissionMaterialProps} />
        </mesh>

        <mesh
          ref={torus003}
          {...nodes.Ring002}
          renderOrder={3}
          position={[
            torus003Controls.positionX,
            torus003Controls.positionY,
            torus003Controls.positionZ,
          ]}
          rotation={[
            THREE.MathUtils.degToRad(torus003Controls.rotationX),
            THREE.MathUtils.degToRad(torus003Controls.rotationY),
            THREE.MathUtils.degToRad(torus003Controls.rotationZ),
          ]}
        >
          <MeshTransmissionMaterial {...transmissionMaterialProps} />
        </mesh>

        <mesh
          ref={torus}
          {...nodes.Ring003}
          renderOrder={4}
          position={[
            torusControls.positionX,
            torusControls.positionY,
            torusControls.positionZ,
          ]}
          rotation={[
            THREE.MathUtils.degToRad(torusControls.rotationX),
            THREE.MathUtils.degToRad(torusControls.rotationY),
            THREE.MathUtils.degToRad(torusControls.rotationZ),
          ]}
        >
          <MeshTransmissionMaterial {...transmissionMaterialProps} />
        </mesh>
      </group>
    </group>
  );
};
