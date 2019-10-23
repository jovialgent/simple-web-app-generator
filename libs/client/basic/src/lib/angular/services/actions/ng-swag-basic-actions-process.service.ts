import { Injectable } from '@angular/core';
import { SetUserDataAction } from '../../../actions/set-user-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicActionsProcessService {
  constructor() {}

  setUserData$(): Observable<any> {
    return SetUserDataAction.run$();
  }
}
