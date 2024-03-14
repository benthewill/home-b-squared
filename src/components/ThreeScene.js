"use client";

import { Canvas, useFrame, useThree, useProgress } from "@react-three/fiber";
import * as THREE from "three";
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  Environment,
  MeshTransmissionMaterial,
  Caustics,
  Center,
  PerformanceMonitor,
  AccumulativeShadows,
  RandomizedLight,
  Lightformer,
  Text,
} from "@react-three/drei";
import React, { Suspense, useRef, useState } from "react";
import Scene from "./Scene";
import { easing } from "maath";
import { useControls } from "leva";
import Env from "@/components/Env";
import {
  BokehShader,
  BokehDepthShader,
} from "three/addons/shaders/BokehShader2.js";
import {
  DepthOfField,
  EffectComposer,
  N8AO,
  TiltShift2,
} from "@react-three/postprocessing";

export default function ThreeScene() {
  // const [perfSucks, degrade] = useState(false)
  const raycaster = new THREE.Raycaster();
  const target = new THREE.Vector3(0, 20, -50);

  return (
    <Suspense fallback={<Loader />}>
      <Canvas
        className="absolute left-0 top-0"
        shadows
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        dpr={[1, 2]}
      >
        <OrbitControls
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enablePan={false}
        />
        <Bar />

        {/*<PerformanceMonitor onDecline={() => degrade(true)} />*/}
        <color attach="background" args={["#f0f0f0"]} />
        <group>
          <Scene position={[0, 0, 0]} />
          <ContactShadows
            position={[0, -0.7, 0]}
            opacity={0.8}
            color={"#75607E"}
            scale={18}
            blur={1.1}
            far={0.8}
          />
        </group>

        <Env />

        {/*<Env perfSucks={perfSucks} />*/}
      </Canvas>
    </Suspense>
  );
}

function Bar() {
  const camera = useThree((state) => state.camera);

  let newPos = new THREE.Vector3();
  camera.lookAt(new THREE.Vector3(0, 1, 0));
  return <></>;
}

function Loader() {
  // const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <div className="bg-grid-small-zinc-50/[0.1] z-50 flex h-full w-full flex-col content-center justify-center bg-zinc-800 align-middle">
      <p className="text-center text-lg text-zinc-100 md:text-3xl">
        Loading Model
      </p>
    </div>
  );
}
