import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ISwagBasicPage, ISwagBasicPageHeader } from '../../../components';
import {
  NgSwagBasicClientManagerService,
  NgSwagBasicRulesService,
  NgSwagBasicUiClassesService
} from '../../services';
import { Observable, combineLatest, of } from 'rxjs';

import { ISwagBasicVisit } from '../../../services';
import { combineAll } from 'rxjs/operators';

@Component({
  selector: 'swag-basic-swag-basic-page-header',
  templateUrl: './swag-basic-page-header.component.html',
  styleUrls: ['./swag-basic-page-header.component.css']
})
export class SwagBasicPageHeaderComponent implements OnInit {
  @Input() settings: ISwagBasicPageHeader;
  @Input() visit: ISwagBasicVisit;
  @Input() pageInfo: ISwagBasicPage;

  public style$: Observable<any>;

  @ViewChild('swagTemplate', { read: ViewContainerRef, static: false })
  _container: ViewContainerRef;

  constructor(
    private _rules: NgSwagBasicRulesService,
    private _client: NgSwagBasicClientManagerService,
    private _uiClassService: NgSwagBasicUiClassesService
  ) {}

  ngOnInit() {
    const class$ = !!this.settings.classes
      ? this._uiClassService.addClasses$(
          'header',
          this.settings.classes,
          this._rules.getRules(),
          this._client.getClientManager().getVisit()
        )
      : of();

    this.style$ = combineLatest([class$]);
  }

  ngAfterViewInit() {}
}
