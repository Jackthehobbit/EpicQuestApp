import {FormInputBase} from './form-input-base'
export class FormInputTextbox extends FormInputBase<string>{
    controlType = 'textbox';
    type: string; //Can be used to specify what the textbox expects (email,telephone etc)

    constructor(options: {type?:string} = {}) {
        super(options); // Call the base class constructor to handle the generic options
        this.type = options['type'] || '';
    }
}