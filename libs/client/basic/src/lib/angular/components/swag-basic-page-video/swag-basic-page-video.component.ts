import { Component, Input, OnInit } from '@angular/core';
import {
  NgSwagBasicActionsProcessService,
  NgSwagBasicClientManagerService
} from '../../services';

import { ISwagBasicPageVideo } from '../../../components/swag-basic-page-video/models';
import { ISwagBasicVisit } from '../../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'swag-basic-page-video',
  templateUrl: './swag-basic-page-video.component.html',
  styleUrls: ['./swag-basic-page-video.component.scss']
})
export class SwagBasicPageVideoComponent implements OnInit {
  @Input()
  public pageInfo: ISwagBasicPageVideo;
  public load$: Observable<ISwagBasicVisit>;
  public linksLoad$: Observable<ISwagBasicVisit>;
  public visit$: Observable<{
    current: ISwagBasicVisit;
    previous: ISwagBasicVisit;
  }>;

  constructor(
    private _action: NgSwagBasicActionsProcessService,
    private _client: NgSwagBasicClientManagerService
  ) {}

  ngOnInit() {
    this.load$ = this._action.process$(this.pageInfo.onLoad);
    this.visit$ = this._client.getVisitManager();
  }

  ngOnDestroy(): void {
    this._action.process(this.pageInfo.onLeave || []).then();
  }
}
