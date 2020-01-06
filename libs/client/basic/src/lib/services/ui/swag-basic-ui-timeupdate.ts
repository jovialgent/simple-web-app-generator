import { Observable, Subject, animationFrameScheduler, of } from 'rxjs';

import { ISwagBasicUiTimeupdate } from './models/swag-basic-ui-timeupdate.interface';
import { repeat } from 'rxjs/operators';

export class SwagBasicTimeupdate extends Subject<ISwagBasicUiTimeupdate> {
  private _animation: Observable<ISwagBasicUiTimeupdate>;
  private _timeupdateSettings: ISwagBasicUiTimeupdate = {
    start: 0,
    current: 0
  };
  constructor() {
    super();

    this._animation = this._getAnimation();
  }

  begin() {
    const start: number = Date.now();
    this._timeupdateSettings = {
      start,
      current: start
    };

    this._animation.subscribe(() => {
      this._timeupdateSettings = {
        ...this._timeupdateSettings,
        current: Date.now()
      };
      this.next(this._timeupdateSettings);
    });
  }



  private _getAnimation(): Observable<ISwagBasicUiTimeupdate> {
    return of(this._timeupdateSettings, animationFrameScheduler).pipe(repeat());
  }
}
