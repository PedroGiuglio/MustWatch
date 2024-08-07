import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  private trendingResultSource = new BehaviorSubject<any[]>([]);
  trendingResult$ = this.trendingResultSource.asObservable();

  private selectedStateNameSource = new BehaviorSubject<string>('');
  selectedStateName$ = this.selectedStateNameSource.asObservable();

  constructor() { }

  updateTrendingResult(results: any[]) {
    this.trendingResultSource.next(results);
    console.log(results, "ddde");
  }

  updateSelectedStateName(stateName: string) {
    this.selectedStateNameSource.next(stateName);
  }
}
