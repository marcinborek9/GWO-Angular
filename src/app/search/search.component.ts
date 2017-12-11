import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { Subject } from 'rxjs/Subject';
import { HttpModule } from '@angular/http';

import { AsyncPipe } from '@angular/common';
import { NgModel } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent {
public results;
public p: number = 1;
public searchElem: string;
public validSearch: boolean = false;
public showPagination;
public loginErrorMessage: boolean = false;
public searchTerm$ = new Subject<string>();
public name: string = '';
public searchForm: FormGroup;



  constructor(
    private searchService: SearchService,
    private fb: FormBuilder) {

    this.searchForm = fb.group({
      search: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(12)])]
    });
      this.searchByTerm();
}


  searchByTerm() {
    this.searchService.search(this.searchTerm$)
      .subscribe(res => {
        this.showPagination = true;
        this.results = res;

        if (this.results.length === 0 ) {
          alert('Niestety nic nie znaleziono.');
          this.showPagination = false;
          return false;
        }
      },
      err => {
        alert('Coś poszło nie tak!');
      });
  }
}
