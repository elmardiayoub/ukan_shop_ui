import { Component, ElementRef, Inject, OnInit, ChangeDetectorRef, PLATFORM_ID, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import intTelInput from 'intl-tel-input';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule, TranslateModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;

  countries: any[] = [];

  intlTelInputInstance: any;
  private validatePhone: (() => void) | undefined;


  @ViewChild('phoneInput') phoneInput!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initIntlTelInput();
    }
  }

  ngOnDestroy(): void {
    if (this.phoneInput && this.phoneInput.nativeElement) {
      this.phoneInput.nativeElement.removeEventListener('blur', this.validatePhone);
    }
  }

  onCountrySelected(country: any) {
    console.log(country);
  }


  private initIntlTelInput(): void {
    const errorMap = [
      "invalidNumber",
      "invalidCountryCode",
      "tooShort",
      "tooLong",
      "unknownError"
    ];

    this.intlTelInputInstance = intTelInput(this.phoneInput.nativeElement, {
      nationalMode: true,
      initialCountry: "ma",
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.2.16/build/js/utils.js",
      dropdownContainer: document.body,
    });

    const validatePhone = () => {
      const errorCode = this.intlTelInputInstance.getValidationError();
      // Adjust the errorKey to reference the nested structure
      const errorKey = `registerComponent.phoneValidation.${errorMap[errorCode] || "unknownError"}`;

      this.translate.get(errorKey).subscribe((message: string) => {
        if (!this.intlTelInputInstance.isValidNumber()) {
          this.registerForm.controls['phone'].setErrors({ 'intlTelInputError': { message } });
        } else {
          this.registerForm.controls['phone'].setErrors(null);
        }
      });
    };

    this.validatePhone = validatePhone;
    this.phoneInput.nativeElement.addEventListener('blur', validatePhone);
  }

  private initializeRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      console.log("ERRORS")
      return;
    }

    console.log('Registration submitted', this.registerForm.value);
  }
}
