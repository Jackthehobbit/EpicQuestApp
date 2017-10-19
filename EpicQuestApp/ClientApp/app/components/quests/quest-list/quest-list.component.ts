import { Component, OnInit } from '@angular/core';
import { Quest } from '../quest';

@Component({
    selector: 'quest-list',
    templateUrl:'quest-list.component.html'
})

export class QuestListComponent implements OnInit {
    quests: Array<Quest>

    ngOnInit(): void {

    }
}