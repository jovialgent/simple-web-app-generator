import { Observable, of } from 'rxjs';

import { ISwagBasicPageClassesRuleObject } from './models';
import { SwagBasicUiUtils } from './swag-basic-ui-utils';
import { isString } from 'lodash';
import {
  SwagBasicRuleEvaluator,
  SwagRuleEvaluator,
  SwagBasicRules
} from '../rules';
import { ISwagBasicVisit } from '../config';
import { map, filter } from 'rxjs/operators';

export class SwagBasicUiClasses {
  constructor() {}

  addClasses$(
    element: HTMLElement | string,
    settings: ISwagBasicPageClassesRuleObject[] | string | string[],
    ruleManger?: SwagBasicRules,
    visit?: ISwagBasicVisit
  ): Observable<HTMLElement[]> {
    const elements: HTMLElement[] = SwagBasicUiUtils.findElements(element);
    const isSettingsString: boolean = isString(settings);
    const isStringArray: boolean = this._checkForStringArray(settings);
    const evaluateClassRules: boolean =
      !!ruleManger && this._checkForClassRuleArray(settings);

    return isSettingsString
      ? of(this._addClassFromString(elements, <string>settings))
      : isStringArray
      ? of(this._addClassFromStringArray(elements, <string[]>settings))
      : evaluateClassRules
      ? this._addClassFromRuleObjectArray$(
          elements,
          <ISwagBasicPageClassesRuleObject[]>settings,
          ruleManger,
          visit
        )
      : of(elements);
  }

  private _addClassFromString(
    elements: HTMLElement[],
    classString: string
  ): HTMLElement[] {
    const addedClassELements = elements.map(element => {
      return this._addClassStringToElement(element, classString);
    });

    return addedClassELements;
  }

  private _addClassFromStringArray(
    elements: HTMLElement[],
    classStringArray: string[]
  ): HTMLElement[] {
    const addedClassELements = elements.map(element => {
      return this._addClassStringArrayToElement(element, classStringArray);
    });

    return addedClassELements;
  }

  private _addClassStringArrayToElement(
    element: HTMLElement,
    classStringArray: string[]
  ): HTMLElement {
    classStringArray.forEach((classString: string) =>
      this._addClassStringToElement(element, classString)
    );

    return element;
  }

  private _addClassStringToElement(
    element: HTMLElement,
    classString: string
  ): HTMLElement {
    element.classList.add(classString);

    return element;
  }

  private _addClassFromRuleObjectArray$(
    elements: HTMLElement[],
    classRules: ISwagBasicPageClassesRuleObject[],
    ruleManger: SwagBasicRules,
    visit: ISwagBasicVisit
  ): Observable<HTMLElement[]> {
    const hasRuleManager = !!ruleManger;

    return ruleManger.evaluateAll$(classRules, visit).pipe(
      map((filteredClassRules: ISwagBasicPageClassesRuleObject[]) => {
        filteredClassRules.forEach(
          (filteredClassRule: ISwagBasicPageClassesRuleObject) => {
            const className = filteredClassRule.className || '';
            const isStringArray: boolean = Array.isArray(className);

            isStringArray
              ? this._addClassFromStringArray(elements, <string[]>className)
              : this._addClassFromString(elements, <string>className);
          }
        );
        
        return elements;
      })
    );
  }

  private _checkForStringArray(settings: any): boolean {
    const settingsIsAnArray: boolean = Array.isArray(settings);
    const isStringArray: boolean =
      settingsIsAnArray && settings.every((el: any) => isString(el));

    return isStringArray;
  }
  private _checkForClassRuleArray(settings: any): boolean {
    const settingsIsAnArray: boolean = Array.isArray(settings);
    const isRuleClassObjectArray: boolean =
      settingsIsAnArray && settings.every((el: any) => !!el && !!el.className);

    return isRuleClassObjectArray;
  }
}
