import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'game',
        loadChildren: () => import('../game/game.module').then(m => m.GamePageModule),
      },
      {
        path: 'score',
        loadChildren: () => import('../score/score.module').then(m => m.ScorePageModule)
      },      
      {
        path: 'players',
        loadChildren: () => import('../players/players.module').then(m => m.PlayersPageModule)
      },    
      {
        path: '',
        redirectTo: '/tabs/game',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/game',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
