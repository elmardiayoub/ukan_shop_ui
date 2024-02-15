import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {


  loginForm!: FormGroup;

  constructor(private formbuilder: FormBuilder) { }

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

    // Implement login logic here (call API Backend)
    // Consider injecting a service to handle authentication and pass the form values for processing.

    console.log('Login successful', this.loginForm.value);
  }

}
