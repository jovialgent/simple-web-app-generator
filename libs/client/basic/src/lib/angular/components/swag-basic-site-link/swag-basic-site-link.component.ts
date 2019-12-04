import {
  Compiler,
  Component,
  HostListener,
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
import { ISwagBasicVisit, SwagBasicUiUtils } from '../../../services';
import {
  NgSwagBasicActionsProcessService,
  NgSwagBasicClientManagerService,
  NgSwagUiManagerService
} from '../../services';
import { cloneDeep, get } from 'lodash';

import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SwagBasicSiteLinkService } from './swag-basic-site-link.service';

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
    private _compiler: Compiler,
    private _linkService: SwagBasicSiteLinkService,
    private _action: NgSwagBasicActionsProcessService
  ) {}

  @HostListener('click', ['$event'])
  onClick(evt: Event) {
    const anchor: HTMLAnchorElement = <HTMLAnchorElement>evt.target;
    const target: string = get(this.settings, 'attributes.target');
    const onLinkClick = this.settings.onLinkClick || [];

    if (this._linkService.shouldOpenInNewTab(this.settings))
      evt.preventDefault();

    this._action.process(onLinkClick).then(() => {
      this._linkService.navigate(anchor, this.settings);
    });
  }

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
    const pathTags = this._linkService.getUrlTags(this.settings);
    const routeTag = !!pathTags.url ? pathTags.url : pathTags.route;
    const attributeString: string = SwagBasicUiUtils.createAttributeString(
      this.settings.attributes || {}
    );
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
      tag: `id="${this.settings.id}" ${routeTag} ${attributeString}`
    };
  }
}
