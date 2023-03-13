import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { API_ROUTES } from 'src/app/constant/constant';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { GridOption } from 'src/app/_metronic/shared/crud-table/models/gridoption.model';
import { TranslationService } from '../../../../../modules/i18n/translation.service';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  language: any;
  languages: any = [];
  gridOption: GridOption = {
    allrecords: true,
    sortDir: 'asc',
    sortField: 'name',
    filters: {
      status: 1
    }
  };
  constructor(
    private translationService: TranslationService,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    // this.getLanguage();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.setSelectedLanguage();
      });
  }

  // async getLanguage() {
  //   this.commonService.searchAll(API_ROUTES.LANGUAGE, this.gridOption).subscribe(response => {
  //     this.languages = response.result.items;
  //   })
  //   if (!localStorage.getItem('language')) {
  //     this.translationService.setLanguage(this.languages[0]);
  //     this.language = this.languages[0];
  //   } else {
  //     // this.language = this.languages[0];
  //     this.language = JSON.parse(localStorage.getItem('language'));
  //   }
  //   this.setSelectedLanguage();
  // }

  setLanguageWithRefresh(lang) {
    this.setLanguage(lang);
  }

  setLanguage(lang) {
    this.languages.forEach((language: any) => {
      if (language.locale === lang.locale) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
  }

  setSelectedLanguage(): any {
    this.setLanguage(this.translationService.getSelectedLanguage());
  }
}
