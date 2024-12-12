import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {UserComponent} from "./user/user.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {BucketsComponent} from "./buckets/buckets.component";

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        children: [
            {
                path: '',
                component: WelcomeComponent,
            },
            {
                path: 'settings',
                component: UserComponent,
            },
            {
                path: 'buckets',
                component: BucketsComponent,
            }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule {
}
