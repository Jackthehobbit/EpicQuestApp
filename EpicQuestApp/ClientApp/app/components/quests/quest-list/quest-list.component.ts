import { Component, OnInit,ViewChild } from '@angular/core';
import { Quest } from '../quest';
import { ModalDialogComponent } from '../../core/modal-dialog/modal-dialog.component'
import { CoreService } from "../../core/core.service";
import { QuestService } from "../quest.service";
import { Message } from "../../core/message/message";

@Component({
    selector: 'quest-list',
    templateUrl:'quest-list.component.html'
})

export class QuestListComponent implements OnInit {
    quests: Array<Quest>
    @ViewChild('deleteDialog') deleteDialog: ModalDialogComponent;
    private toDeleteId?: number;

    constructor(private coreService: CoreService,private questService:QuestService) {

    }

    ngOnInit(): void {
        this.coreService.doExec();
        this.getQuests();
    }

    //Function to return the quests
    getQuests(): void {
        //Send the request to the server to get the requests
        this.questService.getQuests()
            .then( // Successfully got the quests so update the table
                quests => this.quests = quests
            )
            .catch( //Something went wrong - output a message to inform the user
                error => { this.coreService.setMessage(error); }
            );
    }

    //This is called from both the cancel and confirm buttons of the delete dialog - doDelete is true if the user confirmed the delete should happen
    confirmDelete(dodelete: boolean): void {
        this.deleteDialog.close(); // User has confirmed or canceled so do the delete

        let id = this.toDeleteId;
        this.toDeleteId = undefined; // Clear out the to delete Id so it is not accidentally used in the future.

        if (dodelete && typeof id != 'undefined') {
            this.deleteQuest(false, id);
        }
    }

    //Delete a quest.
    deleteQuest(confirm: boolean, id: number) {

        // Should we display a confirm dialog?
        if (confirm) {
            this.toDeleteId = id; // Keep the delete Id so we know which record we are deleting.
            this.deleteDialog.open();
            return; //Nothing else to do - this function will be called again if the user confirms to do the actual delete
        }

        this.questService.deleteQuest(id)
            .then(
            response => {
                let index = this.quests.findIndex(x => x.id === id);
                if (index >= 0) {// find index returns -1 if it can't find the item so we only want to remove an item if we found it
                    this.quests.splice(index, 1);
                }

                let message = new Message();
                message.title = "Record Removed";
                message.type = "Success";
                message.message = "Record removed successfully"

                this.coreService.setMessage(message);
            }
            )
            .catch(error => {
                this.coreService.setMessage(error);

            });
        
    }
}