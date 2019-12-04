import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ISwagBasicVisit, SwagBasicVisitManager } from '../../../services';
import {
  NgSwagBasicActionsProcessService,
  NgSwagBasicClientManagerService
} from '../../services';

import { ISwagBasicPageNavigation } from '../../../components/swag-basic-page-navigation';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'swag-basic-page-navigation',
  templateUrl: './swag-basic-page-navigation.component.html',
  styleUrls: ['./swag-basic-page-navigation.component.css']
})
export class SwagBasicPageNavigationComponent implements OnInit, OnDestroy {
  @Input()
  public pageInfo: ISwagBasicPageNavigation;
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
    this.linksLoad$ = this._action.process$(this.pageInfo.onLinksLoad);
    this.visit$ = this._client.getVisitManager().pipe();
  }

  ngOnDestroy(): void {
    this._action.process(this.pageInfo.onLeave || []).then();
  }
}
