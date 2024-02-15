import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForgotPasswordForm();
  }

  private initializeForgotPasswordForm(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get formControls() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    // Implement forgot password logic here (call API Backend)
    // Consider injecting a service to handle the password reset request and pass the form value for processing.

    console.log('Password reset request submitted', this.forgotPasswordForm.value);
  }
}
