import {
  AfterViewInit,
  Compiler,
  Component,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ISwagBasicPage,
  ISwagBasicPageHeader,
  ISwagBasicTemplate,
  SwagBasicPageHeader
} from '../../../components';
import {
  NgSwagBasicClientManagerService,
  NgSwagBasicRulesService,
  NgSwagBasicUiClassesService,
  NgSwagUiManagerService
} from '../../services';
import { Observable, combineLatest, of } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ISwagBasicVisit } from '../../../services';
import { SwagBasicTemplateComponent } from '../swag-basic-template/swag-basic-template.component';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'swag-basic-swag-basic-page-header',
  templateUrl: './swag-basic-page-header.component.html',
  styleUrls: ['./swag-basic-page-header.component.css']
})
export class SwagBasicPageHeaderComponent implements OnInit, AfterViewInit {
  @Input() settings: ISwagBasicPageHeader;
  @Input() visit: ISwagBasicVisit;
  @Input() pageInfo: ISwagBasicPage;

  public style$: Observable<any>;

  @ViewChild('swagHeaderTemplate', { read: ViewContainerRef, static: false })
  _container: ViewContainerRef;

  constructor(
    private _rules: NgSwagBasicRulesService,
    private _client: NgSwagBasicClientManagerService,
    private _uiClassService: NgSwagBasicUiClassesService,
    private _uiManager: NgSwagUiManagerService,
    private _compiler: Compiler,
    private _injector: Injector,
    private _moduleRef: NgModuleRef<any>
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const renderer: SwagBasicPageHeader = this._uiManager.getUiMap().page
      .header;
    const template = renderer.getHTML({
      body: `
      <ng-container *ngIf="(style$ | async)">
      </ng-container>
      <swag-basic-swag-basic-template [settings]="settings"
          [visit]="visit"
          [pageInfo]="pageInfo"></swag-basic-swag-basic-template>`,
      tag: `[id]="settings?.id"`
    });
    const class$ = !!this.settings.classes
      ? this._uiClassService.addClasses$(
          'header',
          this.settings.classes,
          this._rules.getRules(),
          this._client.getClientManager().getVisit()
        )
      : of();
    const style$ = combineLatest([class$]);

    this._uiManager.renderTemplate(template, this._container, {
      visit: this.visit,
      settings: this.settings,
      pageInfo: this.pageInfo,
      style$
    });
  }
}
