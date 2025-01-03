import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoCommonButtonComponent} from "./demo-common-button/demo-common-button.component";
import {DemoCommonInputComponent} from "./demo-common-input/demo-common-input.component";
import {DemoPageComponent} from "./main-page/demo-page.component";

const routes: Routes = [
    {
        path: '',
        component: DemoPageComponent,
        children: [
            {
                path: 'button',
                component: DemoCommonButtonComponent,
            },
            {
                path: 'input',
                component: DemoCommonInputComponent,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DemoRoutingModule {
}
