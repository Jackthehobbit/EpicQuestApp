import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.module.routing';
import { CoreModule } from './components/core/core.module'

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { QuestListComponent } from './components/quests/quest-list/quest-list.component';
import { HeaderComponent } from './components/shared/header/header.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        QuestListComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        AppRoutingModule,
        CoreModule
    ]
})
export class AppModuleShared {
}
