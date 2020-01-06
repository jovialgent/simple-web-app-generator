import { ISwagBasicUiTimeupdate } from '../../../services/ui/models/swag-basic-ui-timeupdate.interface';
import { Injectable } from '@angular/core';
import { SwagBasicTimeupdate } from '../../../services';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicTimeupdateService {
  private _timeupdate: SwagBasicTimeupdate;

  constructor() {
    this._timeupdate = new SwagBasicTimeupdate();
    this._timeupdate.begin();
  }

  register(
    listener: (timeupdateSettings: ISwagBasicUiTimeupdate) => void
  ): void {
    this._timeupdate.subscribe((timeupdateSettings: ISwagBasicUiTimeupdate) => {
      listener(timeupdateSettings);
    });
  }

  getTimeupdate(): SwagBasicTimeupdate {
    return this._timeupdate;
  }
}
