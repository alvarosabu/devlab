import type { Group } from 'three'
import { AmbientLight, DirectionalLight, Mesh, Timer } from 'three'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { createCamera } from './core/createCamera'
import { createControls } from './core/createControls'
import { createGUI } from './core/createGUI'
import { createRenderer } from './core/createRenderer'
import { createScene } from './core/createScene'
import { createResizeObserver } from './utils/resizeObserver'
import { getGradientMaterial } from './materials/gradientMaterial'
const canvas = document.querySelector<HTMLCanvasElement>('#webgl')
if (!canvas) {
  throw new Error('Canvas #webgl not found')
}

const resizeObserver = createResizeObserver()

const { scene } = createScene({ clearColor: '#333' })

const { renderer, dispose: disposeRenderer } = await createRenderer({
  canvas,
  resizeObserver,
  scene,
})

const { camera, dispose: disposeCamera } = createCamera({ resizeObserver })
scene.add(camera)

createControls(camera, renderer.domElement)

// Main scene
const ambientLight = new AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

const directionalLight = new DirectionalLight('#ffffff', 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, 2.25)

scene.add(directionalLight)

let model: Group | undefined

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load('/models/blender-cube.glb', (gltf) => {
  model = gltf.scene
  model.position.set(0, 0.5, 0)
  scene.add(model)
  model.traverse((child) => {
    if (child instanceof Mesh && child.name === 'Cube002') {
      child.material = getGradientMaterial()
    }
  })
})

// GUI
const { fpsGraph, dispose: disposeGUI } = createGUI()

// Animation loop
const timer = new Timer()

const loop = () => {
  // const elapsed = clock.getElapsedTime()
  fpsGraph.begin()
  timer.update()

  renderer.render(scene, camera)
  fpsGraph.end()
  requestAnimationFrame(loop)
}

loop()

// Optional: cleanup on HMR
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    disposeRenderer()
    disposeCamera()
    disposeGUI()
  })
}
