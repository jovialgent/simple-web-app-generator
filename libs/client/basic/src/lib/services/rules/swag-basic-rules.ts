import {
  ISwagBasicRuleObject,
  BasicRuleConditionOperator,
  ISwagRuleEvaluatorMap,
  ISwagBasicRuleCondition,
  ISwagBasicRule
} from './models';
import { ISwagBasicVisit } from '../config';
import { Observable, of, combineLatest } from 'rxjs';
import { SwagBasicRuleEvaluator } from './evaluators/swag-basic-rule-evaluator';
import { SwagRuleEvaluator } from './evaluators';
import { map, find } from 'rxjs/operators';

export class SwagBasicRules {
  private _basicEvaluators = new SwagBasicRuleEvaluator();
  private _evaluators: ISwagRuleEvaluatorMap = {};
  private _emptyRule: ISwagBasicRuleObject = {
    rule: {
      conditionOperator: BasicRuleConditionOperator.And,
      conditions: []
    }
  };

  constructor(evaluators?: ISwagRuleEvaluatorMap) {
    const customEvaluators: ISwagRuleEvaluatorMap = !!evaluators
      ? evaluators
      : {};

    this._evaluators = {
      basic: this._basicEvaluators,
      ...customEvaluators
    };
  }

  evaluateFirst$(
    rules: ISwagBasicRuleObject[],
    visit: ISwagBasicVisit
  ): Observable<ISwagBasicRuleObject> {
    return combineLatest(this._getRulesObservables(rules, visit)).pipe(
      map(
        (ruleObjs: ISwagBasicRuleObject[]): ISwagBasicRuleObject => {
          const foundRule = ruleObjs.find(
            (ruleObj: ISwagBasicRuleObject) => ruleObj.rule.evaluatedToTrue
          );

          return !!foundRule ? foundRule : this._emptyRule;
        }
      )
    );
  }

  evaluateAll$(
    rules: ISwagBasicRuleObject[],
    visit: ISwagBasicVisit
  ): Observable<ISwagBasicRuleObject[]> {
    return combineLatest(this._getRulesObservables(rules, visit)).pipe(
      map((ruleObjs: ISwagBasicRuleObject[]): ISwagBasicRuleObject[] => {
        const foundRules: ISwagBasicRuleObject[] = ruleObjs.filter(
          (ruleObj: ISwagBasicRuleObject) =>
            !!ruleObj && !!ruleObj.rule && !!ruleObj.rule.evaluatedToTrue
        );

        return foundRules;
      })
    );
  }

  evaluateAll(
    rules: ISwagBasicRuleObject[],
    visit: ISwagBasicVisit
  ): Promise<ISwagBasicRuleObject[]> {
    return this.evaluateAll$(rules, visit).toPromise();
  }

  and$(
    conditions: ISwagBasicRuleCondition[],
    visit: ISwagBasicVisit
  ): Observable<boolean> {
    const evaluators$ = this._getEvaluators$(conditions, visit);

    return combineLatest(evaluators$).pipe(
      map((matches: boolean[]) => {
        return matches.reduce(
          (isMatching: boolean, currentMatch: boolean) =>
            isMatching && currentMatch,
          true
        );
      })
    );
  }

  or$(
    conditions: ISwagBasicRuleCondition[],
    visit: ISwagBasicVisit
  ): Observable<boolean> {
    const evaluators$ = this._getEvaluators$(conditions, visit);

    return combineLatest(evaluators$).pipe(
      map((matches: boolean[]) => {
        return matches.reduce(
          (isMatching: boolean, currentMatch: boolean) =>
            isMatching || currentMatch,
          true
        );
      })
    );
  }

  not$(
    conditions: ISwagBasicRuleCondition[],
    visit: ISwagBasicVisit
  ): Observable<boolean> {
    const evaluators$ = this._getEvaluators$(conditions, visit);
    return combineLatest(evaluators$).pipe(
      map((matches: boolean[]) => {
        return matches.reduce(
          (isMatching: boolean, currentMatch: boolean) =>
            isMatching || currentMatch,
          true
        );
      }),
      map((match: boolean): boolean => !match)
    );
  }

  addEvaluator(evaluators: ISwagRuleEvaluatorMap): ISwagRuleEvaluatorMap {
    this._evaluators = { ...this._evaluators, ...evaluators };

    return this._evaluators;
  }

  private _getEvaluators$(
    conditions: ISwagBasicRuleCondition[],
    visit: ISwagBasicVisit
  ): Observable<boolean>[] {
    return conditions.map(
      (condition: ISwagBasicRuleCondition): Observable<boolean> => {
        const evaluator: SwagRuleEvaluator = this._evaluators[
          condition.evaluatorType
        ];
        return !!evaluator.evaluate$
          ? evaluator.evaluate$(condition, visit)
          : of(false);
      }
    );
  }

  private _getRulesObservables(
    rules: ISwagBasicRuleObject[],
    visit: ISwagBasicVisit
  ): Observable<ISwagBasicRuleObject>[] {
    return rules.map((ruleObj: ISwagBasicRuleObject) => {
      if (!ruleObj.rule)
        return of({
          ...ruleObj,
          rule: {
            ...this._emptyRule.rule,
            evaluatedToTrue: true
          }
        });

      const rule: ISwagBasicRule = ruleObj.rule;
      const hasNoRule: boolean = !rule;
      const conditionOperator: BasicRuleConditionOperator = !hasNoRule
        ? rule.conditionOperator
        : BasicRuleConditionOperator.And;
      const conditions: ISwagBasicRuleCondition[] = !hasNoRule
        ? rule.conditions
        : [];
      const evaluateToTrue: Observable<boolean> = !!this[
        `${conditionOperator}$`
      ]
        ? this[`${conditionOperator}$`](conditions, visit)
        : of(false);
        
      return evaluateToTrue.pipe(
        map(
          (matches: boolean): ISwagBasicRuleObject => {
            const isMatching = matches;
            const newRuleObj: ISwagBasicRuleObject = { ...ruleObj };
            const newRule: ISwagBasicRule = { ...newRuleObj.rule };
            const setEvaluatedToTrueRule = {
              ...newRule,
              evaluatedToTrue: isMatching
            };
            const updatedRuleObj = {
              ...newRuleObj,
              rule: setEvaluatedToTrueRule
            };

            return updatedRuleObj;
          }
        )
      );
    });
  }
}
