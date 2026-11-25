import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'admin', renderMode: RenderMode.Client },
  { path: 'add-courses', renderMode: RenderMode.Client },
  { path: 'auth', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server },
];
