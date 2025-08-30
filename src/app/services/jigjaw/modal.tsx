"use client";
import React, { useEffect, useRef } from "react";
import {
  useGLTF,
  Html,
  Text,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAssets } from "@/contexts/AssetProvider";

export const JigJawModel = ({
  jagjawgroupRef: groupRef,
  jagjawOne: modelRef,
  jagjawTwo: modelRef2,
  jagjawThree: modelRef3,
  jagjawFour: modelRef4,
}: any) => {
  const { nodes } = useGLTF("/3D/jigjaw-centered-op.glb");
  const { setJigjawLoaded } = useAssets();
  const { viewport } = useThree();

  const { invalidate } = useThree();

  const isDesktop = useMediaQuery("min-width", 920) as any;

  useEffect(() => {
    if(isDesktop === undefined) return;
    invalidate();
  }, [isDesktop]);


  // Notify that JigJaw component is loaded when nodes are available
  useEffect(() => {
    if (nodes && Object.keys(nodes).length > 0) {
      setJigjawLoaded(true);
    }
  }, [nodes, setJigjawLoaded]);
  

  // Physical material for glassy look with better performance
  const physicalMaterialProps = {
    transparent: true,
    opacity: 0.6,
    roughness: 0,
    metalness: 0.0,
    transmission: 1.0,
    thickness: 0,
    ior: 1.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    color: "#ffffff",
    side: THREE.DoubleSide,
  };

  // Model material controls
  const materialControls = physicalMaterialProps;

  // Static properties for when controls are disabled
  const staticProps = {
    // JigJaw 1 static properties
    scale: 0.05,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    positionX: -0.95 * 1.5,
    positionY: -2.05 * 1.5,
    positionZ: -0.65 * 1.5,
  };

  const static2Props = {
    // JigJaw 2 static properties
    scale: 0.05,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    positionX: 0.1 * 1.5,
    positionY: -2.25 * 1.5,
    positionZ: -0.65 * 1.5,
  };

  const static3Props = {
    // JigJaw 3 static properties
    scale: 0.05,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    positionX: 0.1 * 1.5,
    positionY: 2.15 * 1.5,
    positionZ: 3.1 * 1.5,
  };

  const static4Props = {
    // JigJaw 4 static properties
    scale: 0.05,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    positionX: 0 * 1.5,
    positionY: -2.95 * 1.5,
    positionZ: 0 * 1.5,
  };

  const staticGroupProps = {
    // Group static properties
    groupPositionX: 0,
    groupPositionY: 0.35,
    groupPositionZ: 0.0,
    groupScale: isDesktop ? 1 : 2.7,
    groupRotationX: -94,
    groupRotationY: -13,
    groupRotationZ: 61,
  };

  // Model transform controls
  const transformControls = staticProps;

  // Model position controls
  const positionControls = staticProps;

  // Model transform controls
  const transformControls2 = static2Props;

  // Model position controls
  const positionControls2 = static2Props;

  // Model transform controls
  const transformControls3 = static3Props;

  // Model position controls
  const positionControls3 = static3Props;

  // Model transform controls
  const transformControls4 = static4Props;

  // Model position controls
  const positionControls4 = static4Props;

  // Group position controls
  const groupControls = staticGroupProps;

  useEffect(() => {
    // Apply group transformations
    if (groupRef.current) {
      // @ts-ignore
      groupRef.current.position.set(
        groupControls.groupPositionX,
        groupControls.groupPositionY,
        groupControls.groupPositionZ
      );
      // @ts-ignore
      groupRef.current.scale.setScalar(
        groupControls.groupScale * (viewport.width / 3.75)
      );
      // @ts-ignore
      groupRef.current.rotation.set(
        THREE.MathUtils.degToRad(groupControls.groupRotationX),
        THREE.MathUtils.degToRad(groupControls.groupRotationY),
        THREE.MathUtils.degToRad(groupControls.groupRotationZ)
      );
    }

    // Apply transformations to J1
    if (modelRef.current) {
      // if (ref) ref.current = modelRef.current;
      // @ts-ignore
      modelRef.current.rotation.set(
        THREE.MathUtils.degToRad(transformControls.rotationX),
        THREE.MathUtils.degToRad(transformControls.rotationY),
        THREE.MathUtils.degToRad(transformControls.rotationZ)
      );
      // @ts-ignore
      modelRef.current.scale.setScalar(transformControls.scale);
      // @ts-ignore
      modelRef.current.position.set(
        positionControls.positionX,
        positionControls.positionY,
        positionControls.positionZ
      );
    }

    // Apply transformations to J2
    if (modelRef2.current) {
      // @ts-ignore
      modelRef2.current.rotation.set(
        THREE.MathUtils.degToRad(transformControls2.rotationX),
        THREE.MathUtils.degToRad(transformControls2.rotationY),
        THREE.MathUtils.degToRad(transformControls2.rotationZ)
      );
      // @ts-ignore
      modelRef2.current.scale.setScalar(transformControls2.scale);
      // @ts-ignore
      modelRef2.current.position.set(
        positionControls2.positionX,
        positionControls2.positionY,
        positionControls2.positionZ
      );
    }

    // Apply transformations to J3
    if (modelRef3.current) {
      // @ts-ignore
      modelRef3.current.rotation.set(
        THREE.MathUtils.degToRad(transformControls3.rotationX),
        THREE.MathUtils.degToRad(transformControls3.rotationY),
        THREE.MathUtils.degToRad(transformControls3.rotationZ)
      );
      // @ts-ignore
      modelRef3.current.scale.setScalar(transformControls3.scale);
      // @ts-ignore
      modelRef3.current.position.set(
        positionControls3.positionX,
        positionControls3.positionY,
        positionControls3.positionZ
      );
    }

    // Apply transformations to J4
    if (modelRef4.current) {
      // @ts-ignore
      modelRef4.current.rotation.set(
        THREE.MathUtils.degToRad(transformControls4.rotationX),
        THREE.MathUtils.degToRad(transformControls4.rotationY),
        THREE.MathUtils.degToRad(transformControls4.rotationZ)
      );
      // @ts-ignore
      modelRef4.current.scale.setScalar(transformControls4.scale);
      // @ts-ignore
      modelRef4.current.position.set(
        positionControls4.positionX,
        positionControls4.positionY,
        positionControls4.positionZ
      );
    }
  }, [
    // Group dependencies
    groupControls.groupPositionX,
    groupControls.groupPositionY,
    groupControls.groupPositionZ,
    groupControls.groupScale,
    groupControls.groupRotationX,
    groupControls.groupRotationY,
    groupControls.groupRotationZ,
    // J1 dependencies
    transformControls.rotationX,
    transformControls.rotationY,
    transformControls.rotationZ,
    transformControls.scale,
    positionControls.positionX,
    positionControls.positionY,
    positionControls.positionZ,
    // J2 dependencies
    transformControls2.rotationX,
    transformControls2.rotationY,
    transformControls2.rotationZ,
    transformControls2.scale,
    positionControls2.positionX,
    positionControls2.positionY,
    positionControls2.positionZ,
    // J3 dependencies
    transformControls3.rotationX,
    transformControls3.rotationY,
    transformControls3.rotationZ,
    transformControls3.scale,
    positionControls3.positionX,
    positionControls3.positionY,
    positionControls3.positionZ,
    // J4 dependencies
    transformControls4.rotationX,
    transformControls4.rotationY,
    transformControls4.rotationZ,
    transformControls4.scale,
    positionControls4.positionX,
    positionControls4.positionY,
    positionControls4.positionZ,
    // Group dependencies
    groupControls.groupPositionX,
    groupControls.groupPositionY,
    groupControls.groupPositionZ,
    groupControls.groupScale,
    groupControls.groupRotationX,
    groupControls.groupRotationY,
    groupControls.groupRotationZ,
  ]);

  return (
    <>
      {/* Text Group - positioned independently outside main group */}
      {/* <group
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
          fontSize={0.1}
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
            opacity={1}
            ref={foundationTitleTopRef}
          />
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
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
          color={staticProps.text1Color}
          anchorX="center"
          anchorY="middle"
        >
          <meshBasicMaterial
            color={staticProps.text2Color}
            transparent={true}
            opacity={1}
            ref={foundationTitleBottomRef}
          />
          Strategy
        </Text>
      </group> */}

      {/* Main Jigsaw Group */}
      <group ref={groupRef}  scale={groupControls.groupScale * (viewport.width / 3.75)}>
        <mesh ref={modelRef} {...nodes.J1}>
          <meshPhysicalMaterial {...materialControls} />
        </mesh>
        <mesh ref={modelRef2} {...nodes.J2}>
          <meshPhysicalMaterial {...materialControls} />
        </mesh>

        <mesh ref={modelRef3} {...nodes.J3}>
          <meshPhysicalMaterial {...materialControls} />
        </mesh>

        <mesh ref={modelRef4} {...nodes.J4}>
          <meshPhysicalMaterial {...materialControls} />
        </mesh>

        {/* HTML Plane - positioned as a 3D object */}
      </group>
    </>
  );
};
