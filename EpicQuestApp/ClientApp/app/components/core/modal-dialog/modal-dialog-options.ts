//This class contains the options available for modal dialogs
import { Button } from '../button/button';
export class ModalDialogOptions {

    //These options control the look and content of the default buttons
    confirmButtonContent: string = "Ok";
    cancelButtonContent: string = "Cancel";
    confirmButtonClass: string = "btn btn-primary";
    cancelButtonClass: string = "btn btn-default";

    //This option can be used to set custom buttons if the default buttons will not suffice
    buttons: Button[];
}