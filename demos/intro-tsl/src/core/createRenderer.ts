import type { Scene } from 'three'
import type { ResizeObserver } from '../utils/resizeObserver'
import { PCFShadowMap } from 'three'
import { WebGPURenderer } from 'three/webgpu'

export interface RendererOptions {
  canvas: HTMLCanvasElement
  scene: Scene
  resizeObserver: ResizeObserver
  background?: string
  shadows?: boolean
}

export const createRenderer = async (options: RendererOptions) => {
  const { canvas, resizeObserver, scene, shadows = true } = options

  const renderer = new WebGPURenderer({ canvas, antialias: true, alpha: true })
  await renderer.init()

  const updateSize = (width: number, height: number) => {
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  if (shadows) {
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFShadowMap
  }

  // Initial size
  const { width, height } = resizeObserver.getSize()
  updateSize(width, height)

  // Subscribe to resize
  const unsubscribe = resizeObserver.onResize(updateSize)

  return {
    renderer,
    scene,
    dispose: () => {
      unsubscribe()
      renderer.dispose()
    },
  }
}
