import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormModule } from './forms/dynamic-form.module'


import { ModalDialogComponent } from './modal-dialog/modal-dialog.component'
import { MessageComponent } from'./message/message.component'

import { CoreService } from './core.service'


@NgModule({
    declarations: [
        ModalDialogComponent,
        MessageComponent
    ],
    imports: [
        CommonModule,
        DynamicFormModule
    ],
    exports: [
        ModalDialogComponent,
        MessageComponent
    ],
    providers: [
        CoreService
    ]
})

export class CoreModule {
}