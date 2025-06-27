import { Routes } from '@angular/router';
import {Home} from '../components/home/home';
import {BoardDetails} from '../components/board-details/board-details';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'boardDetails', component: BoardDetails }
];
