import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";
import { Message } from './message/message';
import { Headers, Http } from '@angular/http';

//This Service contains core functions used throughout the application
@Injectable()
export class CoreService {
    private _debugMode: boolean;
    private _message: BehaviorSubject<Message | null> = new BehaviorSubject(null); // Global Message - Used by the message component to decide whether to display a message or not

    constructor(private httpService: Http) {
        this.setDebugMode(false);
    }

    //Sets Debugmode
    public setDebugMode(mode: boolean) {
        this._debugMode = mode //Update the value
    }

    //Returns True/False if we are running in debug mode
    public getDebugMode() {
        return this._debugMode;
    }

    //This function is the global initalisation
    public doExec() {
        //When executing a page
        this.clearMessage();
    }

    //Function to clear the message
    public clearMessage(): void {
        this._message.next(null);
    }

    //Function to update the message
    public setMessage(messageObject: any): void {
        let message: Message;

        if (messageObject instanceof Message) {
            message = messageObject
        }
        else {
            message = new Message();

            if (typeof messageObject.json === 'function') {
                message = messageObject.json(); // Responses from the server should have a message object when .JSON is called
            }

            if (typeof messageObject.message != 'undefined') { // only message has been defined so build a message object containing it - can happen if the js throws an error
                message.message = messageObject.message;
            }

            if (typeof messageObject == 'string') {// the passed in value is the message itself
                message.message = messageObject;
            }
        }


        if (typeof message.message != 'undefined') {
            this._message.next(message);
        }
    }

    //Function to return the value of the message
    public getMessage(): Observable<Message | null> {
        return this._message.asObservable();
    }

    //Wrapper function to send a HTTP request
    public sendAjaxRequest(method: string, url: string, data: object): Promise<any> {

        //Check we have an url defined - without an url 
        if (typeof url === 'undefined' || url === "" || url === null) {
            return Promise.reject("Cannot Make Ajax call - no url defined");
        }

        //Make the Ajax Call
        switch (method) {
            case "Get":
                return this.httpService.get(url, data).toPromise();
            case "Delete":
                return this.httpService.delete(url, data).toPromise();
            //TODO - More verbs
            default:
                return Promise.reject("Cannot Make Ajax call - invalid method passed in");
        }

    }
}