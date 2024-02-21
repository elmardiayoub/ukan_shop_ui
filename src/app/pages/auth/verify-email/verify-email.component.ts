import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../services/pages/auth/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, CommonModule],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  userEmail: any;


  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    this.userEmail = isPlatformBrowser(this.platformId) ? localStorage.getItem('emailUser') : null;
  }


  onSubmit() {
    // Assuming your AuthService has a method for verifying the email, e.g., verifyEmail
    // this.authService.verifyEmail(this.verifyEmailForm.value.verificationCode)
    //   .subscribe({
    //     next: (res) => {
    //       // Handle response
    //       console.log('Verification successful', res);
    //       // Redirect or show a success message
    //     },
    //     error: (error) => {
    //       // Handle error
    //       console.error('Verification failed', error);
    //       // Show an error message
    //     }
    //   });

  }

  resendVerificationEmail() {
    // Assuming your AuthService has a method for resending the verification code, e.g., resendVerificationCode
    // this.authService.resendVerificationCode()
    //   .subscribe({
    //     next: (res) => {
    //       // Handle response, e.g., showing a success message
    //       console.log('Verification code resent successfully', res);
    //     },
    //     error: (error) => {
    //       // Handle error
    //       console.error('Failed to resend verification code', error);
    //       // Show an error message
    //     }
    //   });
  }
}
