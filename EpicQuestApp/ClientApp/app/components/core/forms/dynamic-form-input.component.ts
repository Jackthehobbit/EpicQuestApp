import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormInputBase } from './form-input-base'

@Component({
    selector: 'dynamic-form-input',
    templateUrl:'dynamic-form-input.component.html'
})

export class DynamicFormInputComponent {
    @Input() formInput: FormInputBase<any>;
    @Input() form: FormGroup;

    get isValid() { return this.form.controls[this.formInput.key].valid }
}