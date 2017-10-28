
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormInputBase } from './form-input-base'
import { DynamicFormService } from './dynamic-form.service'

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    providers:[DynamicFormService]
})

export class DynamicFormComponent implements OnInit {

    @Input() formInputs: FormInputBase<any>[] = [];
    form: FormGroup;

    constructor(private formService: DynamicFormService) { }

    ngOnInit() {
        this.form = this.formService.toFormGroup(this.formInputs);
    }
}
