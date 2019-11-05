import { Component, OnInit } from '@angular/core';
import {
  NgSwagBasicActionsProcessService,
  SwagBasicVisitManager,
  ISwagBasicVisit,
  NgSwagBasicRulesService,
  BasicRuleConditionOperator,
  SwagRuleEvaluator,
  ISwagBasicRuleCondition,
  NgSwagBasicClientManagerService,
  ISwagApp
} from '@simple-web-app-generator/client/basic';
import { Subject, Observable, pipe, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import {
  SwagBasicActionConfigEventName,
  ISwagBasicActionConfigCreateVisit
} from 'libs/client/basic/src/lib/services/actions/models';

@Component({
  selector: 'ng-swag-action-tester-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  public isCreated: boolean = false;
  constructor(
    public actionProcessor: NgSwagBasicActionsProcessService,
    private _rules: NgSwagBasicRulesService,
    private _client: NgSwagBasicClientManagerService
  ) {}

  public visitManager: SwagBasicVisitManager = new SwagBasicVisitManager();
  public actionProcessor$: Observable<any>;
  public config: any;

  ngOnInit() {
    this._client.setUpApp$({}).subscribe((data: ISwagApp) => {
      console.log(data);
    });
  }

  createVisit(config) {}
}
