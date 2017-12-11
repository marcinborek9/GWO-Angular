import { FormBuilder } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchService } from '../search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;

  beforeEach(() => {
    component = new SearchComponent(new FormBuilder(): FormBuilder );
  });

  it('should create a form with one control', () => {
    expect(component.searchForm.contains('search')).toBeTruthy();
  });

  it('should make the name control required', () => {
    const control = component.searchForm.get('search');

    control.setValue('');

    expect(control.valid).toBeFalsy();
  });
});


