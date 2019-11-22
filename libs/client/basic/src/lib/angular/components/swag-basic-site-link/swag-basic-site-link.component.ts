import {
  Compiler,
  Component,
  Input,
  NgModule,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  ISwagBasicLink,
  ISwagBasicLinkRender,
  ISwagBasicPage,
  ISwagBasicTemplate,
  SwagBasicLink,
  SwagBasicPageHeader
} from '../../../components';
import {
  NgSwagBasicClientManagerService,
  NgSwagBasicRulesService,
  NgSwagBasicUiClassesService,
  NgSwagUiManagerService
} from '../../services';
import { Observable, combineLatest } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ISwagBasicVisit } from '../../../services';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'swag-basic-site-link',
  templateUrl: './swag-basic-site-link.component.html',
  styleUrls: ['./swag-basic-site-link.component.css']
})
export class SwagBasicSiteLinkComponent implements OnInit {
  @Input() settings: ISwagBasicLink;
  @Input() visit: ISwagBasicVisit;

  public style$: Observable<any>;

  @ViewChild('swagLinkTemplate', { read: ViewContainerRef, static: false })
  _container: ViewContainerRef;

  constructor(
    private _rules: NgSwagBasicRulesService,
    private _client: NgSwagBasicClientManagerService,
    private _uiClassService: NgSwagBasicUiClassesService,
    private _uiManager: NgSwagUiManagerService,
    private _compiler: Compiler
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const renderer: SwagBasicLink = this._uiManager.getUiMap().site.link;
    const renderData = !!this.settings.renderData
      ? { ...this.settings.renderData, ...this._getDefaultRender() }
      : this._getDefaultRender();
    const template = renderer.getHTML(renderData);
    const settings = cloneDeep(this.settings);

    @Component({
      template: template
    })
    class DynamicComponent {
      public visit$: Observable<{
        current: ISwagBasicVisit;
        previous: ISwagBasicVisit;
      }>;
      public settings: ISwagBasicLink;
      public style$: Observable<any>;

      constructor(
        private _uiClassService: NgSwagBasicUiClassesService,
        private _rules: NgSwagBasicRulesService,
        private _client: NgSwagBasicClientManagerService
      ) {}

      ngOnInit() {
        this.visit$ = this._client.getVisitManager();

        this.settings = settings;

        const elementId = `#${this.settings.id}`;

        const class$ = this._uiClassService.addClasses$(
          elementId,
          this.settings.classes,
          this._rules.getRules(),
          this._client.getClientManager().getVisit()
        );
        const style$ = combineLatest([class$]);

        this.style$ = style$;
      }
    }

    @NgModule({
      declarations: [DynamicComponent],
      imports: [CommonModule]
    })
    class DynamicModule {}

    this._compiler
      .compileModuleAndAllComponentsAsync(DynamicModule)
      .then(mod => {
        const factory = mod.componentFactories.find(
          comp => comp.componentType === DynamicComponent
        );
        const cmpRef = this._container.createComponent(factory);
      });
  }

  private _getDefaultRender(): ISwagBasicLinkRender {
    return {
      body: `
      <ng-container *ngIf="(style$ | async)">
      </ng-container>
      <ng-container *ngIf="(visit$ | async) as visit">
     ${
       !!this.settings.html
         ? this.settings.html
         : !!this.settings.url
         ? this.settings.url
         : ''
     }
     </ng-container>`,
      tag: `id="${this.settings.id}" [href]="settings?.url"`
    };
  }
}
