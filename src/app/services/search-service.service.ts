import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor() { }

  private searchVisibilitySubject = new Subject<boolean>();
  searchVisibility$ = this.searchVisibilitySubject.asObservable();

  toggleSearchVisibility(visible: boolean) {
    this.searchVisibilitySubject.next(visible);
  }
}
