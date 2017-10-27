import { Injectable } from '@angular/core'
import 'rxjs/add/operator/toPromise';

import { Quest } from './quest';
import { CoreService } from "../core/core.service";



@Injectable()
export class QuestService {
    constructor(private coreService: CoreService) { }

    //Returns a list of all Quests
    getQuests(): Promise<Quest[]> {
        return this.coreService.sendAjaxRequest("Get", "api/quests", "")
            .then(
                response => response.json() as Quest[]
            )
            .catch(
                this.handleError
            );
    }

    //Delete a quest
    deleteQuest(id: number): Promise<any> {
        if (typeof id === 'undefined') {
            //TODO
            alert("NO ID");
        }

        return this.coreService.sendAjaxRequest("Delete", "api/quests/" + id, "")
            .then(
                response => response.json()
            )
            .catch(
                this.handleError
            );
    }

    //Add a new quest
    addQuest(quest: Quest): Promise<any> {

        return this.coreService.sendAjaxRequest("Post", "api/quests",quest)
            .then(
            response => response.json()
            )
            .catch(
            this.handleError
            );
            
        
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}