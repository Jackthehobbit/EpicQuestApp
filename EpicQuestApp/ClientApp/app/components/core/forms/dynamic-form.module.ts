import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormService } from './dynamic-form.service'
import { DynamicFormComponent } from './dynamic-form.component'
import { DynamicFormInputComponent } from './dynamic-form-input.component'

@NgModule({
    declarations: [
        DynamicFormComponent,
        DynamicFormInputComponent
    ],
    imports: [
        ReactiveFormsModule
    ],
    exports: [
        DynamicFormComponent,
        DynamicFormInputComponent
    ],
    providers: [
        DynamicFormService
    ]
})

export class DynamicFormModule {
}