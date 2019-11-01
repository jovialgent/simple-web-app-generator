import { Component, OnInit } from '@angular/core';
import {
  NgSwagBasicActionsProcessService,
  SwagBasicVisitManager,
  ISwagBasicVisit,
  NgSwagBasicRulesService,
  BasicRuleConditionOperator,
  SwagRuleEvaluator,
  ISwagBasicRuleCondition
} from '@simple-web-app-generator/client/basic';
import { Subject, Observable, pipe, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  SwagBasicActionConfigEventName,
  ISwagBasicActionConfigCreateVisit
} from 'libs/client/basic/src/lib/services/actions/models';

class MyEvaluator extends SwagRuleEvaluator {
  constructor(){
    super();
    this.evaluatorMap = {
      trying : {
        evaluate$(condition: ISwagBasicRuleCondition, visit : ISwagBasicVisit) : Observable<boolean>{
          console.log("GOT HERE");
          return of(true)
        }
      }
    }
  }
}

@Component({
  selector: 'ng-swag-action-tester-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  public isCreated: boolean = false;
  constructor(
    public actionProcessor: NgSwagBasicActionsProcessService,
    private _rules: NgSwagBasicRulesService
  ) {}

  public visitManager: SwagBasicVisitManager = new SwagBasicVisitManager();
  public actionProcessor$: Observable<any>;
  public config: any;

  ngOnInit() {
    const myEvaluator: SwagRuleEvaluator = new MyEvaluator();
    const myEvaluators = this._rules.addEvaluator({
      test: myEvaluator
    });

    console.log(myEvaluators);
    this.actionProcessor$ = this.actionProcessor.getProcessor();
    this.actionProcessor.addActionTypeMap({
      test: {
        test1: {
          run$(action, visitManager) {
            visitManager.setVisitData({
              'got to test 1': true
            });

            return of(visitManager.getVisit());
          },
          run(action, visitManager) {
            return of({
              id: 'test',
              data: {},
              persistent: {},
              server: {}
            }).toPromise();
          }
        }
      }
    });
  }

  createVisit(config) {
    const createVisitAction: ISwagBasicActionConfigCreateVisit = {
      actionType: 'basic',
      eventName: SwagBasicActionConfigEventName.CreateVisit,
      args: {
        config: {
          id: '123'
        }
      }
    };
    const createActions = this.isCreated ? [] : [createVisitAction];

    this.actionProcessor.process(createActions).then(() => {
      this.isCreated = true;
      this.actionProcessor
        .process([
          {
            actionType: 'basic',
            eventName: SwagBasicActionConfigEventName.SetVisitData,
            rule: {
              conditionOperator: BasicRuleConditionOperator.And,
              conditions: [
                {
                  evaluatorType: 'basic',
                  key: 'id',
                  is: 'equals',
                  value: '123'
                },
                {
                  evaluatorType: 'test',
                  key:'test',
                  is:'trying',
                  value:123
                }
              ]
            },
            args: {
              data: {
                test: 1
              }
            }
          },
          {
            actionType: 'basic',
            eventName: SwagBasicActionConfigEventName.SetVisitData,
            rule: {
              conditionOperator: BasicRuleConditionOperator.And,
              conditions: [
                {
                  evaluatorType: 'basic',
                  key: 'data.test',
                  is: 'equals',
                  value: 1
                }
              ]
            },
            args: {
              data: {
                'after-test': true
              }
            }
          }
        ])
        .then((visit: ISwagBasicVisit) => {});
    });
  }
}
