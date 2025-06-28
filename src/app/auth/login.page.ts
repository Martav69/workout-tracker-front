import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';



interface LoginForm {
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
}
