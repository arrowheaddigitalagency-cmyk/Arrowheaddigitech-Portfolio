'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
function Environment(){const {gl,scene}=useThree();useEffect(()=>{const pmrem=new THREE.PMREMGenerator(gl);const room=new RoomEnvironment();const env=pmrem.fromScene(room,.035);scene.environment=env.texture;room.dispose();pmrem.dispose();return()=>{scene.environment=null;env.dispose();};},[gl,scene]);return null;}
function Capsule({progress}:{progress:RefObject<number>}){
 const root=useRef<THREE.Group>(null),rotor=useRef<THREE.Group>(null);
 useFrame(({clock,pointer},delta)=>{if(!root.current)return;root.current.rotation.y=THREE.MathUtils.lerp(root.current.rotation.y,progress.current*Math.PI*.65+pointer.x*.15,.03);root.current.rotation.z=THREE.MathUtils.lerp(root.current.rotation.z,pointer.y*.035,.03);root.current.position.y=Math.sin(clock.elapsedTime*.65)*.045;if(rotor.current)rotor.current.rotation.y+=Math.min(delta,.05)*.25;});
 return <group ref={root} rotation={[.06,0,-.03]}>
 {[-1.48,1.48].map(y=><group key={y} position={[0,y,0]}><mesh><cylinderGeometry args={[.72,.72,.43,80]}/><meshStandardMaterial color="#d8e0e8" metalness={1} roughness={.18}/></mesh>{[-.225,.225].map(offset=><mesh key={offset} position={[0,offset,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.685,.037,12,80]}/><meshStandardMaterial color="#c2d0df" metalness={1} roughness={.12}/></mesh>)}<mesh position={[0,y>0?-.39:.39,0]}><cylinderGeometry args={[.52,.52,.27,64]}/><meshStandardMaterial color="#a3b4c7" metalness={1} roughness={.22}/></mesh>{[-.07,0,.07].map(offset=><mesh key={offset} position={[0,(y>0?-.39:.39)+offset,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.535,.025,8,64]}/><meshStandardMaterial color="#e8edf1" metalness={1} roughness={.15}/></mesh>)}</group>)}
 <mesh><cylinderGeometry args={[.63,.63,2.7,64,1,true]}/><meshPhysicalMaterial color="#d1e7ff" metalness={.05} roughness={.08} transparent opacity={.1} side={THREE.DoubleSide} depthWrite={false} clearcoat={1}/></mesh>
 {[0,Math.PI/2,Math.PI,Math.PI*1.5].map(a=><mesh key={a} position={[Math.sin(a)*.6,0,Math.cos(a)*.6]}><cylinderGeometry args={[.009,.009,2.7,8]}/><meshStandardMaterial color="#ccdef3" metalness={.8} roughness={.18} transparent opacity={.55}/></mesh>)}
 <group ref={rotor} position={[0,1.85,0]}><mesh><octahedronGeometry args={[.24,0]}/><meshStandardMaterial color="#e5eaf2" metalness={.85} roughness={.15}/></mesh></group>
 <group position={[0,-1.95,0]}><mesh><cylinderGeometry args={[.65,.65,.26,64]}/><meshStandardMaterial color="#a9b9cd" metalness={1} roughness={.22}/></mesh>{Array.from({length:16},(_,i)=><mesh key={i} position={[Math.sin(i*Math.PI/8)*.65,0,Math.cos(i*Math.PI/8)*.65]}><boxGeometry args={[.017,.25,.03]}/><meshStandardMaterial color="#2a364c" metalness={.8} roughness={.3}/></mesh>)}</group>
 <mesh position={[0,-.95,0]} rotation={[Math.PI/2,0,0]}><torusGeometry args={[.5,.008,8,80]}/><meshBasicMaterial color="#74b9ff"/></mesh>
 </group>;
}
export default function EngineeringMachine({progress}:{progress:RefObject<number>}){
 const ref=useRef<HTMLDivElement>(null);
 const [visible,setVisible]=useState(true);
 useEffect(()=>{
  const node=ref.current;
  if(!node)return;
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'120px 0px'});
  observer.observe(node);
  return()=>observer.disconnect();
 },[]);
 return (
  <div className="machine-webgl" ref={ref}>
   <Canvas
    dpr={[1,1.35]}
    frameloop={visible?'always':'never'}
    camera={{position:[0,.4,6.8],fov:39}}
    style={{width:'100%',height:'100%',display:'block'}}
    gl={{alpha:true,antialias:true,powerPreference:'high-performance'}}
   >
    <Environment/>
    <ambientLight intensity={.9}/>
    <directionalLight position={[3,4,5]} intensity={3}/>
    <directionalLight position={[-4,0,-2]} intensity={2} color="#83b6ff"/>
    <Capsule progress={progress}/>
   </Canvas>
  </div>
 );
}
