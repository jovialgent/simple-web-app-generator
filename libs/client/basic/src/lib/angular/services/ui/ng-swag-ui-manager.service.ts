import {
  ISwagBasicTemplateRender,
  SwagBasicUi,
  SwagBasicUiTemplate
} from '../../../components';
import { Observable, combineLatest } from 'rxjs';
import { cloneDeep, get, isEmpty, merge } from 'lodash';

import { ISwagBasicPageClassesRuleObject } from '../../../services';
import { Injectable } from '@angular/core';
import { NgSwagBasicClientManagerService } from '../client';
import { NgSwagBasicRulesService } from '../rules';
import { NgSwagBasicUiClassesService } from './ng-swag-basic-ui-classes.service';

@Injectable({
  providedIn: 'root'
})
export class NgSwagUiManagerService {
  private _uiMap: SwagBasicUiTemplate;
  private _uiTemplateMap: any;

  constructor(
    private _rules: NgSwagBasicRulesService,
    private _client: NgSwagBasicClientManagerService,
    private _uiClassService: NgSwagBasicUiClassesService
  ) {
    this._uiMap = SwagBasicUi;
    this._uiTemplateMap = {};
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

  settUiTemplateMap(uiTemplateMap: any): any {
    this._uiTemplateMap = cloneDeep(uiTemplateMap);
  }

  getUiTemplateMap(): any {
    return this._uiTemplateMap;
  }

  public getStyle$(
    elementId,
    classes: string | string[] | ISwagBasicPageClassesRuleObject[]
  ): Observable<[HTMLElement[]]> {
    const class$ = this._uiClassService.addClasses$(
      elementId,
      classes,
      this._rules.getRules(),
      this._client.getClientManager().getVisit()
    );
    return combineLatest([class$]);
  }

  getTemplate(
    path: string,
    defaultRenderData: ISwagBasicTemplateRender,
    customTemplateData: ISwagBasicTemplateRender
  ): string {
    const renderer = get(this.getUiMap(), path);
    const renderData: ISwagBasicTemplateRender = this._getRenderData(
      path,
      defaultRenderData,
      customTemplateData
    );

    return renderer.getHTML(renderData);
  }

  private _getRenderData(
    path: string,
    defaultRenderData: ISwagBasicTemplateRender,
    customTemplateData: ISwagBasicTemplateRender
  ): ISwagBasicTemplateRender {
    const uiTemplateMapData: ISwagBasicTemplateRender = get(
      this._uiTemplateMap,
      path
    );
    const hasCustomTemplateData: boolean = !isEmpty(customTemplateData);
    const hasUiTemplateMapData = !isEmpty(uiTemplateMapData);

    return hasCustomTemplateData
      ? { ...customTemplateData, ...defaultRenderData }
      : hasUiTemplateMapData
      ? { ...uiTemplateMapData, ...defaultRenderData }
      : defaultRenderData;
  }
}
