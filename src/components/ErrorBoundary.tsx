import { useRouteError } from 'react-router-dom'

export default function ErrorBoundary() {
  const error = useRouteError()

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-black">
      <div className="flex flex-col gap-4 max-w-[35rem] border border-black bg-white rounded-xl p-4 text-center">
        <div className="flex flex-col gap-2 items-center justify-center">
          <img src="/imgs/system/er-bear.png" className="w-20 object-contain" />
          <h4 className="text-base md:text-2xl">
            🐻 Oh no! Uh-oh... Something broke!
          </h4>
          <div className="flex flex-col">
            <p className="text-sm md:text-lg">
              Looks like somethings acting up <br />
              but no worries, we're already on the fix 🛠️🐻
            </p>
            <p className="text-sm md:text-lg">
              You can try reloading the page, or come back later 💫
            </p>
          </div>
          <button
            className="w-full mt-2"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
        {error instanceof Error && (
          <div className="flex flex-col bg-[#FDE0E8] border border-[#F02D68] rounded-xl p-4 max-h-40 overflow-auto text-oswald">
            <p className="text-base md:text-xl text-[#F02D68] font-bold">
              {error.name}
            </p>
            <p className="text-sm md:text-lg ">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}