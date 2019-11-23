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
  ISwagBasicPageHeaderRender,
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
import { cloneDeep, isEmpty } from 'lodash';

import { CommonModule } from '@angular/common';
import { ISwagBasicVisit } from '../../../services';
import { SwagBasicTemplateComponent } from '../swag-basic-template/swag-basic-template.component';

@Component({
  selector: 'swag-basic-swag-basic-page-header',
  templateUrl: './swag-basic-page-header.component.html',
  styleUrls: ['./swag-basic-page-header.component.css']
})
export class SwagBasicPageHeaderComponent implements OnInit, AfterViewInit {
  @Input() settings: ISwagBasicPageHeader;

  public style$: Observable<any>;

  @ViewChild('swagHeaderTemplate', { read: ViewContainerRef, static: false })
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
    const template = this._uiManager.getTemplate(
      'page.header',
      this._getDefaultRender(),
      this.settings.renderData
    );
    const settings = cloneDeep(this.settings);

    @Component({
      template: template
    })
    class DynamicComponent {
      public visit$: Observable<{
        current: ISwagBasicVisit;
        previous: ISwagBasicVisit;
      }>;
      public settings: ISwagBasicTemplate;
      public style$: Observable<any>;

      constructor(
        private _client: NgSwagBasicClientManagerService,
        private _uiManager: NgSwagUiManagerService
      ) {}

      ngOnInit() {
        this.visit$ = this._client.getVisitManager();
        this.settings = settings;

        const elementId = `#${this.settings.id}`;

        this.style$ = this._uiManager.getStyle$(
          elementId,
          this.settings.classes
        );
      }
      ngAfterViewInit() {}
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

  private _getTemplate(): string {
    const renderer: SwagBasicPageHeader = this._uiManager.getUiMap().page
      .header;
    const renderData: ISwagBasicPageHeaderRender = this._getRenderData();

    return renderer.getHTML(renderData);
  }

  private _getRenderData(): ISwagBasicPageHeaderRender {
    const customTemplate: ISwagBasicPageHeaderRender = this._uiManager.getUiTemplateMap()
      .page.header;
    const hasLocalRenderData = !isEmpty(this.settings.renderData);
    const hasCustomRenderData = !isEmpty(customTemplate);

    console.log(hasLocalRenderData);

    return hasLocalRenderData
      ? { ...this.settings.renderData, ...this._getDefaultRender() }
      : hasCustomRenderData
      ? { ...customTemplate, ...this._getDefaultRender() }
      : this._getDefaultRender();
  }

  private _getDefaultRender(): ISwagBasicPageHeaderRender {
    return {
      body: `
      <ng-container *ngIf="(style$ | async)">
      </ng-container>
      <ng-container *ngIf="(visit$ | async) as visit">
     ${this.settings.html}
     </ng-container>`,
      tag: `id="${this.settings.id}"`
    };
  }
}
