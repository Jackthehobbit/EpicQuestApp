export class Message {
    id?: string | null //Identifier of the message (e.g no-matches)
    type?: string | null  //Warning,Error,Info or Success
    title?: string | null//Title for the message box
    message: string //The error message to display
    status?: number | null //Error status - used for debugging
    debugMessage?: string | null // Debug message - used for debugging

}