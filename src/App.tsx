import { useLayoutEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { virtualScroll } from './helpers/virtualScroll'

import { routes } from './routes/configs'

function App() {
  useLayoutEffect(() => {
    virtualScroll.init()
  }, [])

  return <RouterProvider router={routes} />
}

export default App
