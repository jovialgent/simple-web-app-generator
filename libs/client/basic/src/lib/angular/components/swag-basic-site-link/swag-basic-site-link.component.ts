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
  ISwagBasicTemplate
} from '../../../components';
import {
  NgSwagBasicClientManagerService,
  NgSwagUiManagerService
} from '../../services';

import { CommonModule } from '@angular/common';
import { ISwagBasicVisit } from '../../../services';
import { Observable } from 'rxjs';
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
    private _uiManager: NgSwagUiManagerService,
    private _compiler: Compiler
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const template = this._uiManager.getTemplate(
      'site.link',
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
