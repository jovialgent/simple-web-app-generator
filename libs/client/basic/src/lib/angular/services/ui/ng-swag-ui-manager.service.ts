import {
  Compiler,
  Component,
  Injectable,
  Injector,
  NgModule,
  NgModuleRef,
  ViewContainerRef
} from '@angular/core';
import {
  ISwagBasicPage,
  ISwagBasicTemplate,
  SwagBasicUi
} from '../../../components';
import { Observable, combineLatest, of } from 'rxjs';
import { cloneDeep, merge } from 'lodash';

import { CommonModule } from '@angular/common';
import { ISwagBasicUiRendererData } from './models';
import { ISwagBasicVisit } from '../../..';
import { NgSwagBasicClientManagerService } from '../client';
import { NgSwagBasicRulesService } from '../rules';
import { NgSwagBasicUiClassesService } from './ng-swag-basic-ui-classes.service';
import { SwagBasicTemplateComponent } from '../../components/swag-basic-template';

@Injectable({
  providedIn: 'root'
})
export class NgSwagUiManagerService {
  private _uiMap: any;

  constructor(
    private _rules: NgSwagBasicRulesService,
    private _client: NgSwagBasicClientManagerService,
    private _uiClassService: NgSwagBasicUiClassesService,
    private _uiManager: NgSwagUiManagerService,
    private _compiler: Compiler,
    private _injector: Injector,
    private _moduleRef: NgModuleRef<any>
  ) {
    this._uiMap = SwagBasicUi;
  }

  getUiMap(): any {
    return cloneDeep(this._uiMap);
  }

  mergeUiMap(uiMap: any): any {
    const oldMap = cloneDeep(this._uiMap);
    const newMap = merge(oldMap, uiMap);

    this._uiMap = newMap;

    return oldMap;
  }

  setUiMap(uiMap: any): any {
    const oldMap = cloneDeep(this._uiMap);

    this._uiMap = uiMap;

    return oldMap;
  }

  renderTemplate(
    template: string,
    container: ViewContainerRef,
    data: ISwagBasicUiRendererData
  ) {
    const templateVisit = cloneDeep(data.visit);
    const templateSettings = cloneDeep(data.settings);
    const templatePage = cloneDeep(data.pageInfo);
    const style$ = !!data.style$ ? data.style$ : of();

    const tmpCmp = Component({ template: template })(
      class {
        constructor() {}
        visit: ISwagBasicVisit = templateVisit;
        page: ISwagBasicPage = templatePage;
        settings: ISwagBasicTemplate = templateSettings;
        style$: Observable<any>;
        ngOnInit() {
          this.style$ = style$;
        }
      }
    );
    const tmpModule = NgModule({
      declarations: [tmpCmp, SwagBasicTemplateComponent],
      imports: [CommonModule]
    })(class {});

    this._compiler
      .compileModuleAndAllComponentsAsync(tmpModule)
      .then(factories => {
        const f = factories.componentFactories[0];
        const cmpRef = f.create(this._injector, [], null, this._moduleRef);

        container.insert(cmpRef.hostView);
      });
  }
}
