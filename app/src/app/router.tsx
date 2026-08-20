import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

import { AppLayout } from './layouts/app-layout'
import { AuthLayout } from './layouts/auth-layout'
import { ProtectedRoute, PublicOnlyRoute } from './route-guards'
import { NotFoundPage } from './components/not-found-page'
import { RouteErrorBoundary } from './components/route-error-boundary'

const LoginPage = lazy(() =>
  import('@/features/auth/pages/login-page').then((m) => ({ default: m.LoginPage })),
)
const HomePage = lazy(() =>
  import('@/features/home/pages/home-page').then((m) => ({ default: m.HomePage })),
)
const PeoplePage = lazy(() =>
  import('@/features/people/pages/people-page').then((m) => ({ default: m.PeoplePage })),
)
const PersonPage = lazy(() =>
  import('@/features/people/pages/person-page').then((m) => ({ default: m.PersonPage })),
)
const CarePage = lazy(() =>
  import('@/features/care/pages/care-page').then((m) => ({ default: m.CarePage })),
)
const AskPage = lazy(() =>
  import('@/features/ask/pages/ask-page').then((m) => ({ default: m.AskPage })),
)
const MapPage = lazy(() =>
  import('@/features/map/pages/map-page').then((m) => ({ default: m.MapPage })),
)
const SettingsPage = lazy(() =>
  import('@/features/settings/pages/settings-page').then((m) => ({ default: m.SettingsPage })),
)

export const router = createBrowserRouter(
  [
    {
      element: (
        <PublicOnlyRoute>
          <AuthLayout />
        </PublicOnlyRoute>
      ),
      errorElement: <RouteErrorBoundary />,
      children: [{ path: 'login', Component: LoginPage }],
    },
    {
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      errorElement: <RouteErrorBoundary />,
      children: [
        { index: true, Component: HomePage },
        { path: 'people', Component: PeoplePage },
        { path: 'people/:personId', Component: PersonPage },
        { path: 'care', Component: CarePage },
        { path: 'ask', Component: AskPage },
        { path: 'map', Component: MapPage },
        { path: 'settings', Component: SettingsPage },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  // Khớp router với `base` của bản build (GitHub Pages).
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') },
)
