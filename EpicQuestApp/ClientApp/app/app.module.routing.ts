import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Import any compnents required for the routes
import { HomeComponent } from './components/home/home.component'; 
import { QuestListComponent } from './components/quests/quest-list/quest-list.component'; 


//Define the routes used by the application
const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'all-quests', component: QuestListComponent },
    { path: '**', redirectTo: 'home' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}