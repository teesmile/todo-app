import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import Root from './routes/__root';
import Home from './routes/home';
import TodoDetail from './routes/todos/$id';
import NotFound from './routes/not-found'; 

const rootRoute = createRootRoute({
  component: Root,
});

const homeRoute = createRoute({
  path: '/',
  component: Home,
  getParentRoute: () => rootRoute,
});

const todoDetailRoute = createRoute({
  path: 'todos/$id',
  component: TodoDetail,
  getParentRoute: () => rootRoute,
});


const notFoundRoute = createRoute({
  path: '*',
  component: NotFound,
  getParentRoute: () => rootRoute,
});

export const router = createRouter({
  routeTree: rootRoute.addChildren([
    homeRoute,
    todoDetailRoute,
    notFoundRoute 
  ]),
  notFoundMode: 'root', 
  defaultNotFoundComponent: NotFound,
});

