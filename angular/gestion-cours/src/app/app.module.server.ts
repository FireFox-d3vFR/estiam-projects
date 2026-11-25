import { NgModule } from '@angular/core';
import { provideServerRoutesConfig } from '@angular/ssr';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { serverRoutes } from './app.routes.server';
import { API_URL, LOCAL_API_URL } from './services/api-url';

@NgModule({
  imports: [AppModule, ServerModule],
  providers: [
    provideServerRoutesConfig(serverRoutes),
    { provide: API_URL, useValue: process.env['API_URL'] || LOCAL_API_URL },
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
