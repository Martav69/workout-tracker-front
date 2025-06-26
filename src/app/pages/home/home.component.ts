import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ScrollFadeDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}



