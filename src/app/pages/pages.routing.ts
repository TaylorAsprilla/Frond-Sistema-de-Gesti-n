import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth/auth.guard';
import { TokenResolver } from '../resolver/token.resolver';
import { PermisosResolver } from '../services/permisos/permisos.resolver';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'sistema',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    resolve: { permisos: PermisosResolver, token: TokenResolver },
    loadChildren: () => import('./child-routes/child-routes.module').then((m) => m.ChildRoutesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
