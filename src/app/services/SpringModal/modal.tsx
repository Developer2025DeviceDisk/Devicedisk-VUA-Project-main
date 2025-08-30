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

export const SpringModel = ({
  Spring,
  jagjawgroupRef: groupRef,
  jagjawOne: modelRef,
  jagjawTwo: modelRef2,
  jagjawThree: modelRef3,
  jagjawFour: modelRef4,
}: any) => {
  const { nodes } = useGLTF("/3D/srping-joint-op.glb");
  const { setSpringLoaded } = useAssets();

  const { viewport } = useThree();
  const { invalidate } = useThree();
  const isDesktop = useMediaQuery("min-width", 920) as any;


  useEffect(() => {
    if(isDesktop === undefined) return;
    invalidate();
  }, [isDesktop]);

  // Notify that Spring component is loaded when nodes are available
  useEffect(() => {
    if (nodes && Object.keys(nodes).length > 0) {
      setSpringLoaded(true);
    }
  }, [nodes, setSpringLoaded]);
  

  // Physical material for glassy look with better performance
  const physicalMaterialProps = {
    transparent: true,
    opacity: 0.5,
    roughness: 0.1,
    metalness: 0.0,
    transmission: 1.0,
    thickness: 0.5,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    color: "#ffffff",
    side: THREE.DoubleSide,
  };

  // Model material controls
  const materialControls = physicalMaterialProps;

  // Static properties for when controls are disabled
  const staticTransformProps = {
    scale: 0.08,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  };

  const staticTransform2Props = {
    scale: 0.08,
    rotationX: 180,
    rotationY: 0,
    rotationZ: 0,
  };

  const staticPositionProps = {
    positionX: -3.6,
    positionY: 0,
    positionZ: -3.6,
  };

  const staticPosition2Props = {
    positionX: 3,
    positionY: 0,
    positionZ: 3,
  };

  const staticGroupProps = {
    groupPositionX: 0,
    groupPositionY: 0.7,
    groupPositionZ: 0.0,
    groupScale: isDesktop ? 0.6 : 0.6 * 2.2,
    groupRotationX: -94,
    groupRotationY: -2,
    groupRotationZ: 45,
  };

  // Model transform controls

  const transformControls =  staticTransformProps;

  // Model position controls

  const positionControls =  staticPositionProps;

  // Model transform controls

  const transformControls2 = staticTransform2Props;

  // Model position controls

  const positionControls2 =  staticPosition2Props;

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
      {/* Main Jigsaw Group */}
      <group
        ref={groupRef}
        scale={groupControls.groupScale * (viewport.width / 3.75)}
      >
        <mesh ref={modelRef} {...nodes.mark_obj}>
          <meshPhysicalMaterial {...materialControls} />
        </mesh>
        <mesh ref={modelRef2} {...nodes.mark_obj001}>
          <meshPhysicalMaterial {...materialControls} />
        </mesh>

        {/* HTML Plane - positioned as a 3D object */}
      </group>
    </>
  );
};
