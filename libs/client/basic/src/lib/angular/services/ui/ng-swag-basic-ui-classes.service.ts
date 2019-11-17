import {
  ISwagBasicPageClassesRuleObject,
  ISwagBasicVisit,
  SwagBasicRules,
  SwagBasicUiClasses
} from '../../../services';

import { Injectable } from '@angular/core';
import { NgSwagBasicRulesService } from '../rules';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NgSwagBasicUiClassesService {
  private _classService: SwagBasicUiClasses;
  constructor(private _ruleService: NgSwagBasicRulesService) {
    this._classService = new SwagBasicUiClasses();
  }

  addClasses$(
    element: HTMLElement | string,
    settings: string | string[] | ISwagBasicPageClassesRuleObject[],
    rules?: SwagBasicRules,
    visit? : ISwagBasicVisit
  ): Observable<HTMLElement[]> {
    return this._classService.addClasses$(element, settings, rules, visit);
  }
}
