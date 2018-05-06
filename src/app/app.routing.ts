import { RouterModule, Routes, PreloadAllModules } from '@angular/router'
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Login' }
    },
    {
        path: 'about',
        component: AboutComponent,
        data: { title: 'About List' }
    },
    {
        path: 'book-create',
        component: CreateBookComponent,
        data: { title: 'Create a book List' }
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
        data: { title: 'Not Found List' }
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '/not-found'
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes, {
   // enableTracing: true,
    preloadingStrategy: PreloadAllModules,
    useHash: true
});