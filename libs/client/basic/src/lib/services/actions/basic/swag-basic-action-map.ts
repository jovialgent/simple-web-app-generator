import { SwagBasicActionSetVisitData } from './swag-basic-action-set-visit-data';
import { SwagBasicActionCreateVisit } from './swag-basic-action-create-visit';
import { ISwagActionMap, SwagBasicActionConfigEventName } from '../models';

export class BasicActionMap {
  public actionMap: ISwagActionMap;

  constructor() {
    this.actionMap = {
      [SwagBasicActionConfigEventName.CreateVisit]: new SwagBasicActionCreateVisit(),
      [SwagBasicActionConfigEventName.SetVisitData]: new SwagBasicActionSetVisitData()
    };
  }
}

export const basicActionMap: ISwagActionMap = new BasicActionMap().actionMap;
