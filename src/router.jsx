import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import Root from './routes/__root';
import Home from './routes/home/index';
import TodoDetail from './routes/todos/$id';
import NotFound from './routes/not-found';

// Create the root route (the layout)
const rootRoute = createRootRoute({
  component: Root,
});

// Define the Home route
const homeRoute = createRoute({
  path: '/',
  component: Home,
  getParentRoute: () => rootRoute,
});

// Define the Todo Detail route (dynamic parameter)
const todoRoute = createRoute({
  path: 'todos/$id',
  component: TodoDetail,
  getParentRoute: () => rootRoute,
});

// Define the NotFound route (catch-all)
const notFoundRoute = createRoute({
  path: '*',
  component: NotFound,
  getParentRoute: () => rootRoute,
});

// Build the route tree by adding children to the root route.
const routeTree = rootRoute.addChildren(
    [homeRoute, 
    todoRoute, 
    notFoundRoute]);

// Create the router instance
export const router = createRouter({
  routeTree,
  notFoundMode: 'fuzzy',
});

