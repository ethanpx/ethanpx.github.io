import CubeContainer from './Cube'

export default function Projects() {
  return (
    <div className="flex flex-col gap-6">
      <span className="w-fit flex flex-row gap-2 py-2 px-4 cursor-pointer select-none bg-[#F59E0B]">
        Projects
      </span>
      <CubeContainer />
    </div>
  )
}
