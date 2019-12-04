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
  ISwagBasicPageFooter,
  ISwagBasicPageFooterRender,
  ISwagBasicTemplate
} from '../../../components';
import { ISwagBasicVisit, SwagBasicUiUtils } from '../../../services';
import {
  NgSwagBasicClientManagerService,
  NgSwagBasicRulesService,
  NgSwagBasicUiClassesService,
  NgSwagUiManagerService
} from '../../services';

import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'swag-basic-swag-basic-page-footer',
  templateUrl: './swag-basic-page-footer.component.html',
  styleUrls: ['./swag-basic-page-footer.component.css']
})
export class SwagBasicPageFooterComponent implements OnInit {
  @Input() settings: ISwagBasicPageFooter;

  public style$: Observable<any>;

  @ViewChild('swagFooterTemplate', { read: ViewContainerRef, static: false })
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
      'page.footer',
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
        const elementId = `#${settings.id}`;

        this.visit$ = this._client.getVisitManager();
        this.settings = settings;
        this.style$ = this._uiManager.getStyle$(
          elementId,
          this.settings.classes
        );
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

  private _getDefaultRender(): ISwagBasicPageFooterRender {
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
