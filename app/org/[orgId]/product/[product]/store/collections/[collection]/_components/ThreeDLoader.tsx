'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'

import { Bounds, Html, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { AnimationMixer } from 'three'

import ListBox from '@/components/Listbox'

type ThreeDModelProps = {
  modelUrl: string
  enablePan?: boolean
  enableZoom?: boolean
  loader?: JSX.Element
}

const ThreeDLoader = ({ modelUrl, enablePan = true, enableZoom = true, loader }: ThreeDModelProps) => {
  const [modelAnimation, setModelAnimation] = useState<{ name: string; value: string }[]>([])
  const [selectedAnimation, setSelectedAnimation] = useState<string>('')

  function Model({ url }: { url: string }) {
    const { scene, animations } = useGLTF(url, true)

    // initialize mixer in useMemo to avoid re-creating it on every frame
    const mixer = useMemo(() => new AnimationMixer(scene), [scene])

    useEffect(() => {
      if (animations.length > 0 && modelAnimation.length === 0) {
        const mappedAnimations = animations.map((animation, index) => ({
          name: animation.name,
          value: index.toString(),
        }))

        setModelAnimation(mappedAnimations)
        setSelectedAnimation('0') // Set the first animation as default
      }
    }, [animations])

    useEffect(() => {
      if (mixer && selectedAnimation !== '') {
        mixer.clipAction(animations[parseInt(selectedAnimation)]).play()
      }
    }, [animations, mixer])

    useFrame((state, delta) => {
      mixer?.update(delta)
    })

    return <primitive object={scene} dispose={null} />
  }

  return (
    <>
      <div className='absolute m-6 z-40 w-44'>
        {selectedAnimation !== null && modelAnimation.length > 0 && (
          <ListBox
            options={modelAnimation}
            value={selectedAnimation.toString()}
            setValue={(selected) => {
              setSelectedAnimation(selected)
            }}
          />
        )}
      </div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -15, -10]} />
        <Suspense fallback={<Html center>{loader ? loader : null}</Html>}>
          <Bounds fit clip observe margin={1}>
            <Model url={modelUrl} />
          </Bounds>
        </Suspense>
        <OrbitControls
          autoRotate={false}
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.75}
          enablePan={enablePan}
          enableZoom={enableZoom}
        />
      </Canvas>
    </>
  )
}

export default ThreeDLoader
