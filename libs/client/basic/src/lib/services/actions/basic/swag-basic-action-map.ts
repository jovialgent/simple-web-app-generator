import { SwagBasicActionSetVisitData } from './swag-basic-action-set-visit-data';
import { SwagBasicActionCreateVisit } from './swag-basic-action-create-visit';
import { ISwagActionMap, SwagBasicActionConfigEventName } from '../models';
import { SwagBasicActionSetServerData } from './swag-basic-action-set-server-data';

export class BasicActionMap {
  public actionMap: ISwagActionMap;

  constructor() {
    this.actionMap = {
      [SwagBasicActionConfigEventName.CreateVisit]: new SwagBasicActionCreateVisit(),
      [SwagBasicActionConfigEventName.SetVisitServerData]: new SwagBasicActionSetServerData(),
      [SwagBasicActionConfigEventName.SetVisitData]: new SwagBasicActionSetVisitData()
    };
  }
}

export const basicActionMap: ISwagActionMap = new BasicActionMap().actionMap;
