// Localization is based on '@ngx-translate/core';
// Please be familiar with official documentations first => https://github.com/ngx-translate/core

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

export interface Locale {
  lang: string;
  data: any;
}

const LOCALIZATION_LOCAL_STORAGE_KEY = 'language';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  // Private properties
  private langIds: any = [];
  languageVisibilityChange: Subject<boolean> = new Subject<boolean>();


  constructor(private translate: TranslateService) {
    // add new langIds to the list
    this.translate.addLangs(['en']);

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');
    if (localStorage.getItem('language')) {
      this.setLanguage(JSON.parse(localStorage.getItem('language')))
    }
  }

  loadTranslations(...args: Locale[]): void {
    const locales = [...args];

    locales.forEach((locale) => {
      // use setTranslation() with the third argument set to true
      // to append translations instead of replacing them
      this.translate.setTranslation(locale.lang, locale.data, true);

      this.langIds.push(locale.lang);
    });

    // add new languages to the list
    this.translate.addLangs(this.langIds);
  }

  setLanguage(lang) {
    if (lang) {
      this.translate.use(this.translate.getDefaultLang());
      this.translate.use(lang.locale);
      localStorage.setItem(LOCALIZATION_LOCAL_STORAGE_KEY, JSON.stringify(lang));
      this.changeLanguage(lang);
    }
  }

  /**
   * Returns selected language
   */
  getSelectedLanguage(): any {
    const languageData = localStorage.getItem(LOCALIZATION_LOCAL_STORAGE_KEY);
    return JSON.parse(languageData) || this.translate.getDefaultLang();
  }

  changeLanguage(value) {
    this.languageVisibilityChange.next(value);
  }

}
