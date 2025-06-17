import { createRootRoute, createRoute } from '@tanstack/react-router';
import Root from './__root';
import Home from './home';
import TodoDetail from './todos/$id';
import NotFound from './not-found';
import ErrorTestPage from './test-error-boundary';

const rootRoute = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <Root />
    </ErrorBoundary>
  ),
});

export const routeTree = rootRoute.addChildren([
  createRoute({
    path: '/',
    component: Home,
  }),
  createRoute({
    path: '/todos/$id',
    component: TodoDetail,
  }),
  createRoute({
    path: '/test-error',
    component: ErrorTestPage,
  }),
  createRoute({
    path: '*',
    component: NotFound,
  }),
]);