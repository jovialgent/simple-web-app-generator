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
  ISwagBasicPage,
  ISwagBasicPageFooter,
  ISwagBasicPageFooterRender,
  ISwagBasicPageHeader,
  ISwagBasicTemplate,
  SwagBasicPageFooter,
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
import { SwagBasicTemplateComponent } from '../swag-basic-template';
import { cloneDeep } from 'lodash';
import { delay } from 'rxjs/operators';

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
    const renderer: SwagBasicPageHeader = this._uiManager.getUiMap().page
      .footer;
    const renderData = !!this.settings.renderData
      ? { ...this._getDefaultRender(), ...this.settings.renderData }
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

      public settings: ISwagBasicTemplate;
      public style$: Observable<any>;

      constructor(
        private _rules: NgSwagBasicRulesService,
        private _client: NgSwagBasicClientManagerService,
        private _uiClassService: NgSwagBasicUiClassesService
      ) {}

      ngOnInit() {
        this.visit$ = this._client.getVisitManager();
        this.settings = settings;

        const class$ = this._uiClassService.addClasses$(
          `#${this.settings.id}`,
          this.settings.classes,
          this._rules.getRules(),
          this._client.getClientManager().getVisit()
        );
        const style$ = combineLatest([class$]);

        this.style$ = style$;

        this.style$.subscribe(data => {
          console.log(data);
        });
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
