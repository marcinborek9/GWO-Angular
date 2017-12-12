import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchService {
public apiUrl = 'https://gwo.pl/booksApi/v1/search?query=';

  constructor(private http: Http) { }

  search(terms: Observable<string>) {
    return terms.debounceTime(450)
    .distinctUntilChanged()
    .switchMap(term => this.searchEntries(term))
    .catch(err => {
      alert('Coś poszło nie tak, skontaktuj się z Administratorem!');
      return Observable.empty();
    });
  }

  searchEntries(term) {
    if (term.length >= 3 && term.length <= 12) {
      return this.http
          .get(this.apiUrl + term)
          .map(res => res.json())
          .catch(err => {
            alert('Coś poszło nie tak, skontaktuj się z Administratorem!');
            return Observable.empty();
          });
        } else {
          return Observable.empty();
        }
    }
}
