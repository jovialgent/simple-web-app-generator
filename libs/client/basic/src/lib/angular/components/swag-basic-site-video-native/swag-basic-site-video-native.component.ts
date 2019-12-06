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
  ISwagBasicTemplate,
  ISwagBasicVideo,
  ISwagBasicVideoNative,
  ISwagBasicVideoNativeRender,
  SwagBasicPageHeader
} from '../../../components';
import { ISwagBasicVisit, SwagBasicUiUtils } from '../../../services';
import {
  NgSwagBasicClientManagerService,
  NgSwagBasicRulesService,
  NgSwagBasicUiClassesService,
  NgSwagUiManagerService
} from '../../services';
import { cloneDeep, isEmpty } from 'lodash';

import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'swag-basic-video-native',
  templateUrl: './swag-basic-site-video-native.component.html',
  styleUrls: ['./swag-basic-site-video-native.component.scss']
})
export class SwagBasicSiteVideoNativeComponent implements OnInit {
  @Input() settings: ISwagBasicVideoNative;

  public style$: Observable<any>;

  @ViewChild('swagVideoNativeTemplate', {
    read: ViewContainerRef,
    static: false
  })
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
      'site.video.player.native',
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
    const renderData: ISwagBasicVideoNativeRender = this._getRenderData();

    return renderer.getHTML(renderData);
  }

  private _getRenderData(): ISwagBasicVideoNativeRender {
    const customTemplate: ISwagBasicVideoNativeRender = this._uiManager.getUiTemplateMap()
      .page.header;
    const hasLocalRenderData = !isEmpty(this.settings.renderData);
    const hasCustomRenderData = !isEmpty(customTemplate);

    return hasLocalRenderData
      ? { ...this.settings.renderData, ...this._getDefaultRender() }
      : hasCustomRenderData
      ? { ...customTemplate, ...this._getDefaultRender() }
      : this._getDefaultRender();
  }

  private _getDefaultRender(): ISwagBasicVideoNativeRender {
    const attributeString: string = SwagBasicUiUtils.createAttributeString(
      this.settings.attributes || {}
    );
    return {
      body: `
      <ng-container *ngIf="(style$ | async)">
      </ng-container>
      <ng-container *ngIf="(visit$ | async) as visit">
     ${this.settings.html}
     </ng-container>`,
      tag: `id="${this.settings.id}" ${attributeString}`
    };
  }
}
