import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/pages/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {


  loginForm!: FormGroup;
  http = inject(HttpClient);

  showErrorPopup: boolean = false;
  errorMessage: string = '';


  constructor(private formbuilder: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  private initializeLoginForm(): void {
    this.loginForm = this.formbuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }


  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);

        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.showErrorPopup = true;
        this.errorMessage = "Login failed. Please check your email and password and try again";
        setTimeout(() => {
          this.showErrorPopup = false;
        }, 4000);
      }
    });
  }

}
