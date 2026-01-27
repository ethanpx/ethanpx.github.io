import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import AppLayout from '@/layouts/AppLayout'
import HomePage from '@/app/home/Page'
import ErrorBoundary from '@/components/ErrorBoundary'

import { RouterKeys } from '@/constant/router'
import { termRoutes } from './term.routers'

export const routes = createBrowserRouter([
  {
    path: RouterKeys.Home,
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      { index: true, element: <HomePage /> },
      termRoutes,
    ],
    ErrorBoundary,
  },

  {
    path: '/*',
    element: <Navigate to={RouterKeys.Home} />,
  },
])
