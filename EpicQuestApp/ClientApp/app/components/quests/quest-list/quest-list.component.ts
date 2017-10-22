import { Component, OnInit,ViewChild } from '@angular/core';
import { Quest } from '../quest';
import { ModalDialogComponent } from '../../core/modal-dialog/modal-dialog.component'

@Component({
    selector: 'quest-list',
    templateUrl:'quest-list.component.html'
})

export class QuestListComponent implements OnInit {
    quests: Array<Quest>
    @ViewChild('deleteDialog') deleteDialog: ModalDialogComponent;
    private toDeleteId?: number;

    ngOnInit(): void {
        this.quests = [
            {
                id: 1,
                name:"Test Quest 1"
            },
            {
                id: 2,
                name:"Test Quest 2"
            }
        ];
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

    //Delete a unit.
    deleteQuest(confirm: boolean, id: number) {

        // Should we display a confirm dialog?
        if (confirm) {
            this.toDeleteId = id; // Keep the delete Id so we know which record we are deleting.
            this.deleteDialog.open();
            return; //Nothing else to do - this function will be called again if the user confirms to do the actual delete
        }

        alert(id + " Would be deleted");
        
    }
}