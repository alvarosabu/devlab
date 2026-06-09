import { mix, positionLocal, uniform, time, sin, vec3, cos } from 'three/tsl'
import { Color, MeshStandardNodeMaterial } from 'three/webgpu'

export const getGradientMaterial = () => {
  const material = new MeshStandardNodeMaterial()

  const topColor = uniform(new Color('#6366f1'))
  const bottomColor = uniform(new Color('#ec4899'))

  const t = time.mul(0.8)
  const freq = positionLocal.y.mul(Math.PI)

  const factor = sin(positionLocal.y.add(t)).mul(0.5).add(0.5)

  material.colorNode = mix(bottomColor, topColor, factor)

  material.positionNode = vec3(
    positionLocal.x.add(sin(freq.add(t)).mul(0.1)),
    positionLocal.y,
    positionLocal.z.add(cos(freq.add(t)).mul(0.2))
  )

  return material
}