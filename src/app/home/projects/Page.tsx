import CubeContainer from './Cube'

export default function Projects() {
  return (
    <div className="flex flex-col gap-6">
      <label className="w-fit flex flex-row gap-2 cursor-pointer select-none">
        Activate 3D Cube
      </label>
      {/* Scene */}
      <CubeContainer />
    </div>
  )
}
