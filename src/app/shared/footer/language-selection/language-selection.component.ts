import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.css']
})
export class LanguageSelectionComponent implements OnInit {
  languageOptionsVisible: boolean = false;
  currentLanguage: string | undefined;
  effectiveLang: string | undefined;

  constructor(public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    const browserLang = this.translate.getBrowserLang();
    this.effectiveLang = browserLang?.match(/en|fr|ar/) ? browserLang : 'en'

    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('userLanguage');
      this.effectiveLang = savedLang || (browserLang?.match(/en|fr|ar/) ? browserLang : 'en');

    }

    this.translate.use(this.effectiveLang);
    this.currentLanguage = this.languageMap[this.effectiveLang] || 'English';
  }

  private languageMap: { [key: string]: string } = {
    en: 'English',
    fr: 'Français',
    ar: 'العربية',
  };

  @HostListener('document:click', ['$event'])
  clickOutside(event: any): void {
    if (!event.target.closest('.language-selection')) {
      this.languageOptionsVisible = false;
    }
  }

  toggleLanguageOptions(): void {
    this.languageOptionsVisible = !this.languageOptionsVisible;
  }

  selectLanguage(language: string, languageText: string): void {
    this.currentLanguage = languageText;
    this.toggleLanguageOptions();
    this.translate.use(language);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userLanguage', language);
    }
  }
}
