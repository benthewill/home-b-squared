'use client'

import { Canvas } from '@react-three/fiber'
import * as THREE from "three";
import { useGLTF, OrbitControls, ContactShadows } from '@react-three/drei'

export default function ThreeScene() {

    return (
        <Canvas
            shadows
            camera={{position:[0,0,-20]}}
        >
            <mesh>
                <boxGeometry args={[2,2,2]} />
            </mesh>
            <ambientLight intensity={2} />
            <OrbitControls/>
        </Canvas>
    )
}