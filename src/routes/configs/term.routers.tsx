import { RouteObject } from 'react-router-dom'

import TermOfUsePage from '@/app/term-of-use/Page'

import { RouterKeys } from '@/constant/router'


export const termRoutes: RouteObject = {
  path: RouterKeys.TermOfUse,
  element: <TermOfUsePage />,
}
