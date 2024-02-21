import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/pages/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  isSubmitting: boolean = false;
  showErrorPopup: boolean = false;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private userService: AuthService,
    private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

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
    this.isSubmitting = true;
    this.forgotPasswordForm.get('email')?.disable();
    this.userService.resetPassword(this.forgotPasswordForm.value.email).subscribe({
      next: (response) => {
        console.log('Password reset email sent successfully', response);
        this.router.navigate(['/verify-email']);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('emailUser', this.forgotPasswordForm.value.email);
        }

      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error sending password reset email', error);

        this.showErrorPopup = true;
        this.errorMessage = error.error || 'An unexpected error occurred';
        setTimeout(() => {
          this.showErrorPopup = false;
        }, 4000);
      }
    });
  }
}

