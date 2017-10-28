import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormInputBase } from './form-input-base'

///This service is responsible for creating forms using the dynamics form componenets
@Injectable()
export class DynamicFormService {
    constructor() { }

    //Function to return a form group for a set of form inputs
    toFormGroup(formInputs: FormInputBase<any>[]): FormGroup {
        let group: any = {};

        //Loop the forminputs and create a form control for each
        formInputs.forEach(formInput => {
            if (formInput.required) {
                group[formInput.key] = new FormControl(formInput.value || '', Validators.required);
            }
            else {
                group[formInput.key] = new FormControl(formInput.value || '');
            }
        });

        return new FormGroup(group);
    }
}