import {
  Compiler,
  Component,
  Injectable,
  Injector,
  NgModule,
  NgModuleRef,
  TypeDecorator,
  ViewContainerRef
} from '@angular/core';
import {
  ISwagBasicPage,
  ISwagBasicTemplate,
  SwagBasicUi,
  SwagBasicUiTemplate
} from '../../../components';
import { Observable, combineLatest, of } from 'rxjs';
import { cloneDeep, merge } from 'lodash';

import { CommonModule } from '@angular/common';
import { ISwagBasicUiRendererData } from './models';
import { ISwagBasicVisit } from '../../../services';
import { NgSwagBasicClientManagerService } from '../client';
import { NgSwagBasicRulesService } from '../rules';
import { NgSwagBasicUiClassesService } from './ng-swag-basic-ui-classes.service';
import { SwagBasicTemplateComponent } from '../../components/swag-basic-template';

@Injectable({
  providedIn: 'root'
})
export class NgSwagUiManagerService {
  private _uiMap: SwagBasicUiTemplate;
  private _tempModule: any;
  private _imports: any[];

  constructor(
    private _rules: NgSwagBasicRulesService,
    private _client: NgSwagBasicClientManagerService,
    private _uiClassService: NgSwagBasicUiClassesService,
    private _uiManager: NgSwagUiManagerService,

  ) {
    this._uiMap = SwagBasicUi;
  }

  getUiMap(): any {
    return cloneDeep(this._uiMap.getUIComponents());
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
}
