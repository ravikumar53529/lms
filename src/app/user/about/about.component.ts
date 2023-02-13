import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  card1 = {
    background: 'lightblue',
    color: 'black',
    'font-size': '18px',
    height: '300px',
    'text-align': 'center',
  };
  card2 = {
    background: 'yellow',
    color: 'black',
    'font-size': '18px',
    height: '300px',
    'text-align': 'center',
  };
  card3 = {
    background: 'lightgreen',
    color: 'black',
    'font-size': '18px',
    height: '300px',
    'text-align': 'center',
  };
}
