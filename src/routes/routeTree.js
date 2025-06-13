import { createRouteTree } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import { Route as homeRoute } from './home';
import { Route as todoDetailRoute } from './todos/$id';

export const routeTree = rootRoute.addChildren([
  homeRoute,
  todoDetailRoute,
]);