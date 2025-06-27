import { Component } from '@angular/core';
import {NavigationBar} from '../components/navigation-bar/navigation-bar';

@Component({
  selector: 'app-root',
  imports: [NavigationBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
