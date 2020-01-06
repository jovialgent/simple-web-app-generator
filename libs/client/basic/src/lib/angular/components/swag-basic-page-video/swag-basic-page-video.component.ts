import { Component, Input, OnInit } from '@angular/core';
import {
  ISubscriptionEvent,
  ISwagBasicEventBusSubscriptionObj,
  ISwagBasicVisit
} from '../../../services';
import {
  ISwagBasicVideoEventArgs,
  SwagBasicVideoEventName
} from '../../../components';
import {
  NgSwagBasicActionsProcessService,
  NgSwagBasicClientManagerService,
  NgSwagBasicEventBusService
} from '../../services';
import { Observable, Subject } from 'rxjs';

import { ISwagBasicPageVideo } from '../../../components/swag-basic-page-video/models';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'swag-basic-page-video',
  templateUrl: './swag-basic-page-video.component.html',
  styleUrls: ['./swag-basic-page-video.component.scss']
})
export class SwagBasicPageVideoComponent implements OnInit {
  @Input()
  public pageInfo: ISwagBasicPageVideo;
  public load$: Observable<ISwagBasicVisit>;
  public ready$: Subject<ISwagBasicEventBusSubscriptionObj>;
  public linksLoad$: Observable<ISwagBasicVisit>;
  public visit$: Observable<{
    current: ISwagBasicVisit;
    previous: ISwagBasicVisit;
  }>;
  public isReady: boolean = false;

  constructor(
    private _action: NgSwagBasicActionsProcessService,
    private _client: NgSwagBasicClientManagerService,
    private _eventBus: NgSwagBasicEventBusService
  ) {}

  ngOnInit() {
    const playerId: string =
      !!this.pageInfo && !!this.pageInfo.player && !!this.pageInfo.player.id
        ? this.pageInfo.player.id
        : '';
    this.load$ = this._action.process$(this.pageInfo.onLoad);
    this.ready$ = this._eventBus.getEventBus();
    this.visit$ = this._client.getVisitManager();

    const readyListener: () => ISubscriptionEvent = this._eventBus.on(
      SwagBasicVideoEventName.Ready,
      (args: ISwagBasicVideoEventArgs) => {
        const isReady = !!args && !!args.id && args.id === playerId;
       
        this.isReady = isReady;
        isReady ? readyListener() : null;
      }
    );
  }

  ngOnDestroy(): void {
    this._action.process(this.pageInfo.onLeave || []).then();
  }
}
