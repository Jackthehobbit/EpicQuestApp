import { Injectable } from '@angular/core'
import 'rxjs/add/operator/toPromise';

import { Quest } from './quest';
import { CoreService } from "../core/core.service";



@Injectable()
export class QuestService {
    constructor(private coreService: CoreService) { }

    //Returns a list of all Quests
    getQuests(): Promise<Quest[]> {
        return this.coreService.sendAjaxRequest("Get", "api/quests", {})
            .then(
                response => response.json() as Quest[]
            )
            .catch(
                this.handleError
            );
    }


    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }
}