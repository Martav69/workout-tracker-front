import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { HlmButtonModule } from '@spartan-ng/helm/button';
import { HlmAvatarModule } from '@spartan-ng/helm/avatar';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, HlmButtonModule, HlmAvatarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  auth = inject(AuthService);
  router = inject(Router);

  menuOpen = false;

  user$ = this.auth.user$;

  isHomeRoute() {
    return this.router.url === '/';
  }

  logout() {
    this.auth.logout();           // supprime le token, etc.
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
