import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent {
public results: string;
public name: string = '';
public p: number = 1;
public showPagination: boolean;
public searchTerm$ = new Subject<string>();
public searchForm: FormGroup;

  constructor(
    private searchService: SearchService,
    private fb: FormBuilder) {

      this.searchForm = this.fb.group({
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

  scrollTop() {
    window.scrollTo(0, 0);
  }
}
