'use client'

import React, { useRef } from "react";
import {
    useAnimations,
    useGLTF,
    Center,
    Caustics,
    Environment,
    Lightformer,
    RandomizedLight,
    PerformanceMonitor,
    AccumulativeShadows,
    MeshTransmissionMaterial, ContactShadows
} from "@react-three/drei";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import { LayerMaterial, Depth, Fresnel } from 'lamina'

const innerMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 1,
    color: 'black',
    roughness: 0,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    envMapIntensity: 2
})

const path = 'https://sinkbpkdxfjiqjiofwzr.supabase.co/storage/v1/object/public/gltfs/balloons_low.glb'
const mainPathLocal = 'models/balloons_low.glb'
const pinchedPathLocal = 'models/balloons_pinched_low.glb'

export default function Scene(props) {
    const { nodes, materials } = useGLTF(mainPathLocal)
    const {nodes: pinched} = useGLTF(pinchedPathLocal)


    // let planes, planeObjects, planeHelpers;
    // let clock;
    // const arr = [0,1,2]

    // planes = [
    //     new THREE.Plane( new THREE.Vector3( - 1, 0, 0 ), 0 ),
    //     new THREE.Plane( new THREE.Vector3( 0, - 1, 0 ), 0 ),
    //     new THREE.Plane( new THREE.Vector3( 0, 0, - 1 ), 0 )
    // ];
    const gradient = 0.4

    const mainObject = useRef()
    const gradientRef = useRef()

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        // mainObject.current.rotation.x = clock.getElapsedTime()
        mainObject.current.rotation.y = clock.getElapsedTime() * 0.2
        mainObject.current.rotation.set(Math.cos(t / 2) / 4, Math.sin(t / 4) / 8, -0.2 - (1 + Math.sin(t / 1.5)) / 20)
        mainObject.current.position.y = (1 + Math.sin(t / 1.5)) / 10

        const sin = Math.sin(clock.elapsedTime / 2)
        const cos = Math.cos(clock.elapsedTime / 2)
        gradientRef.current.layers[0].origin.set(cos / 2, 0, 0)
        gradientRef.current.layers[1].origin.set(cos, sin, cos)
        gradientRef.current.layers[2].origin.set(sin, cos, sin)
        gradientRef.current.layers[3].origin.set(cos, sin, cos)
    })

    return (
        <group {...props} dispose={null} ref={mainObject} >
            <spotLight intensity={3} angle={0.3} penumbra={1} position={[10, 15, 10]} castShadow/>

            <group>
                <Caustics
                    backfaces
                    color={[1, 0.8, 0.8]}
                    focus={[0, -1.2, 0]}
                    lightSource={[-1.2, 3, -2]}
                    frustum={1.75}
                    intensity={0.003}
                    worldRadius={0.26 / 10}
                    ior={0.9}
                    backfaceIor={1.26}
                >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.vellum.geometry}
                        onClick={(e) => console.log(e)}
                    >
                        <MeshTransmissionMaterial
                            // backside
                            backsideThickness={0.1}
                            thickness={0.05}
                            chromaticAberration={0.05}
                            anisotropicBlur={1}
                            clearcoat={1}
                            clearcoatRoughness={1}
                            envMapIntensity={2}
                        />
                    </mesh>
                </Caustics>
                <mesh {...props} geometry={pinched.mesh_0.geometry}>
                    <LayerMaterial ref={gradientRef} toneMapped={false}>
                        <Depth colorA="#ff0080" colorB="black" alpha={1} mode="normal" near={0.5 * gradient} far={0.5}
                               origin={[0, 0, 0]}/>
                        <Depth colorA="blue" colorB="#f7b955" alpha={1} mode="add" near={2 * gradient} far={2}
                               origin={[0, 1, 1]}/>
                        <Depth colorA="green" colorB="#f7b955" alpha={1} mode="add" near={3 * gradient} far={3}
                               origin={[0, 1, -1]}/>
                        <Depth colorA="white" colorB="red" alpha={1} mode="overlay" near={1.5 * gradient} far={1.5}
                               origin={[1, -1, -1]}/>
                        <Fresnel mode="add" color="white" intensity={0.5} power={1.5} bias={0.05}/>
                    </LayerMaterial>
                </mesh>

                {/** Some hacks to get some back face reflections, otherwise the glass would look fake */}
                <mesh scale={[0.99, 0.99, 0.99]} geometry={nodes.vellum.geometry} material={innerMaterial}/>
                <mesh geometry={nodes.vellum.geometry} material={innerMaterial}/>
            </group>


            {/*<AccumulativeShadows position={[0,-0.55,0]} frames={600} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.6} >*/}
            {/*    <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />*/}
            {/*</AccumulativeShadows>*/}

            {/*<group position={[0, 0, 0.2]} ref={mainObject}>*/}
            {/*    {*/}
            {/*        arr.map((i, idx) => {*/}
            {/*            return (*/}
            {/*                <group key={i}>*/}
            {/*                    <CreatePlaneStencilGroup plane={planes[i]} renderOrder={i + 1}/>*/}
            {/*                    <group>*/}
            {/*                        <mesh*/}
            {/*                            onAfterRender={(renderer) => renderer.clearStencil()}*/}
            {/*                            renderOrder={i + 1.1}*/}
            {/*                            */}
            {/*                        >*/}
            {/*                            <planeGeometry args={[4, 4]}/>*/}
            {/*                            <meshStandardMaterial*/}
            {/*                                color={0xE91E63}*/}
            {/*                                metalness={0.1}*/}
            {/*                                roughness={0.8}*/}
            {/*                                clippingPlanes={planes.filter(p => p !== planes[i])}*/}
            {/*                                stencilWrite={true}*/}
            {/*                                stencilRef={0}*/}
            {/*                                stencilFunc={THREE.NotEqualStencilFunc}*/}
            {/*                                stencilFail={THREE.ReplaceStencilOp}*/}
            {/*                                stencilZFail={THREE.ReplaceStencilOp}*/}
            {/*                                stencilZPass={THREE.ReplaceStencilOp}*/}
            {/*                            />*/}
            {/*                        </mesh>*/}
            {/*                    </group>*/}
            {/*                </group>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*    <mesh*/}
            {/*        geometry={nodes.vellum.geometry}*/}
            {/*        castShadow={true}*/}
            {/*        renderOrder={6}*/}
            {/*    >*/}
            {/*        <meshStandardMaterial*/}
            {/*            color={0xFFC107}*/}
            {/*            metalness={0.1}*/}
            {/*            roughness={0.75}*/}
            {/*            clippingPlanes={planes}*/}
            {/*            clipShadows={true}*/}
            {/*            shadowSide={THREE.DoubleSide}*/}
            {/*        />*/}

            {/*    </mesh>*/}
            {/*</group>*/}
        </group>
    )
}

// export function CreatePlaneStencilGroup({plane, renderOrder}) {
//     const {nodes, materials} = useGLTF(mainPathLocal)
//
//     return (
//         <group>
//             {/*<mesh geometry={nodes.vellum.geometry}/>*/}
//             <mesh
//                 geometry={nodes.vellum.geometry}
//                 renderOrder={renderOrder}
//             >
//                 <meshBasicMaterial
//                     side={THREE.BackSide}
//                     clippingPlanes={[plane]}
//                     depthWrite={false}
//                     depthTest={false}
//                     colorWrite={false}
//                     stencilWrite={true}
//                     stencilFunc={THREE.AlwaysStencilFunc}
//                     stencilFail={THREE.IncrementWrapStencilOp}
//                     stencilZFail={THREE.IncrementWrapStencilOp}
//                     stencilZPass={THREE.IncrementWrapStencilOp}
//                 />
//             </mesh>
//             <mesh
//                 geometry={nodes.vellum.geometry}
//                 renderOrder={renderOrder}
//             >
//                 <meshBasicMaterial
//                     side={THREE.FrontSide}
//                     clippingPlanes={[plane]}
//                     depthWrite={false}
//                     depthTest={false}
//                     colorWrite={false}
//                     stencilWrite={true}
//                     stencilFunc={THREE.AlwaysStencilFunc}
//                     stencilFail={THREE.DecrementStencilOp}
//                     stencilZFail={THREE.DecrementStencilOp}
//                     stencilZPass={THREE.DecrementStencilOp}
//                 />
//             </mesh>
//         </group>
//     )
//
// }

useGLTF.preload(mainPathLocal);
