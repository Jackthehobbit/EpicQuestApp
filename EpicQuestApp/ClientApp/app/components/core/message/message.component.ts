import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Message } from "./message";
import { CoreService } from "../core.service";

@Component({
    selector: 'message',
    templateUrl: './message.component.html'
})

export class MessageComponent {
    class: string | null;
    message: Message | null;
    messageSubscription: Subscription; //Subscription to updates to the message so we can update the UI

    constructor(private coreService: CoreService) {
        //Run any global initalisation
        this.coreService.doExec();

        //Subscribe to updates to the message value from the messagestore so the UI automatically updates
        this.messageSubscription = this.coreService.getMessage().subscribe(message => { this.updateMessage(message) });
    }

    //Called when the component is destroyed
    OnDestroy() {
        //Remove the subscription to prevent memory leaks
        this.messageSubscription.unsubscribe();
    }

    //Function to update the class to assign based on the message type
    private setClass(): void {
        if (this.message == null) {
            return; // no message to set class on
        }

        switch (this.message.type) {
            case "Error":
                this.class = "callout-danger";
                break;
            case "Warning":
                this.class = "callout-warning";
                break;
            case "Info":
                this.class = "callout-info";
                break;
            case "Success":
                this.class = "callout-success";
                break;
            default:
                this.class = "";
        }

    }

    //Function to default the values if anything is missing
    private setDefaults(): void {
        if (this.message == null) {
            return; // no message to set defaults on
        }

        if (this.message.type == "" || typeof this.message.type === 'undefined') {
            this.message.type = "Error";
        }

        if (this.message.title == "" || typeof this.message.title === 'undefined') {
            this.message.title = "Process Error";
        }
    }

    //Function to update the message
    public updateMessage(message: Message | null): void {
        //Update the message value
        this.message = message;

        //Set any defaults in case the message is missing them
        this.setDefaults();

        //Update the class so the message is styled correctly.
        this.setClass();
    }
}