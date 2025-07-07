import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';



interface LoginForm {
  username: string;
  password: string;
}

interface RegisterForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  formData: LoginForm = {
    username: '',
    password: ''
  };

  registerData: RegisterForm = {
    username: '',
    password: ''
  };

  showRegister = false;
  registerError: string | null = null;
  registerSuccess: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()){
      this.router.navigate(['/dashboard'])
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.auth.login(this.formData).subscribe({
        next: () => {},
        error: (err) => console.error(err)
      });
    }
  }

  onRegister(form: NgForm): void {
    if (form.valid) {
      this.auth.register(this.registerData).subscribe({
        next: () => {
          this.registerSuccess = true;
          this.registerError = null;
          this.showRegister = false;
        },
        error: (err) => {
          this.registerError = err.error?.message || 'Erreur lors de la création du compte.';
          this.registerSuccess = false;
        }
      });
    }
  }
}
