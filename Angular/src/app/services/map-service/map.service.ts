import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public mapHighlightSubject = new Subject<string>();

  // subscribe to this in property view form to highlight property card when hovering over on the map
  public refreshMapHighlight$ = this.mapHighlightSubject.asObservable(); 

  constructor() { }
}
