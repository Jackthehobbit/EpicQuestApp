import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { ModalDialogOptions } from './modal-dialog-options';
import { Button } from '../button/button';

@Component({
    selector: 'modal-dialog',
    templateUrl: './modal-dialog.component.html'
})

export class ModalDialogComponent {

    @Input() title: string;// Title of the modal
    @Output() confirmClick: EventEmitter<any> = new EventEmitter();
    @Output() cancelClick: EventEmitter<any> = new EventEmitter();
    private showConfirmButton: boolean;
    private showCancelButton: boolean;
    private visible: boolean;
    private options: ModalDialogOptions;


    constructor() {
        this.showConfirmButton = false; // We can't check to see if the buttons are needed until onInit fires so hide them by default
        this.showCancelButton = false;
        this.visible = false;
    }


    //Function that runs when the component initialises
    ngOnInit(): void {
        //Set the default values for the component
        this.setDefaults();
    }

    //Function taht opens the dialog
    open(options?: ModalDialogOptions): void {
        if (typeof options != 'undefined' && options != null) {
            this.options = options;
        }

        this.checkButtons();

        this.visible = true;
    }

    //Function that closes the dialog
    close(): void {
        this.visible = false;
    }

    //Function called when the confirm button is clicked
    confirm(): void {
        this.confirmClick.emit();
    }

    //Function called when the cancel button is clicked
    cancel(): void {
        this.cancelClick.emit();
    }

    //Function to update the options of a modal dialog
    setOptions(options: ModalDialogOptions) {
        this.options = options;
    }

    //Sets the default options for the component - the user can override these by passing an options object in to the show method
    private setDefaults() {

        this.options = new ModalDialogOptions(); //The constructor of the options class sets the default values

        this.visible = false;

        if (typeof this.title == 'undefined' || this.title == "" || this.title == null) {
            this.title = "Dialog";
        }

        this.checkButtons();
    }

    //Returns the style to be applied to the modal
    private getStyle() {
        if (this.visible) {
            return { "display": "block" }; //The Modal class used by BS has a display of none so we need to override this
        }
        else {
            return null;
        }
    }

    //Function to check to see if buttons are needed
    private checkButtons() {
        //We only show the buttons if the component has events linked to them 
        //(otherwise they would do nothing so no point showing them)
        this.showConfirmButton = this.confirmClick.observers.length > 0;
        this.showCancelButton = this.cancelClick.observers.length > 0;
    }



}