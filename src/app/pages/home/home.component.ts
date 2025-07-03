import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ScrollFadeDirective } from '../../shared/directives/scroll-fade.directive';
import { HlmAvatarModule } from '@spartan-ng/helm/avatar';
import { HlmCardModule } from '@spartan-ng/helm/card';
import { HlmButtonModule } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, ScrollFadeDirective, HlmAvatarModule, HlmCardModule, HlmButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly currentYear = new Date().getFullYear();
}



