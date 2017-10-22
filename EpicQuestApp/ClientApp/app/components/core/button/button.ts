import { EventEmitter, Output } from '@angular/core';
export class Button {
    id?: string | null //Identifier of the for the button
    text: string // Text to put on the button
    class?: string | null = "btn btn-default" //class to apply to the button
    @Output() onButtonClick: EventEmitter<any> = new EventEmitter<any>(); //Function to call

    clickButton(): void {
        this.onButtonClick.emit();
    }
}