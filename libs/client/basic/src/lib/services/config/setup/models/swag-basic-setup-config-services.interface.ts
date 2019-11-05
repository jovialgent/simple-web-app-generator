import { ISwagBasicSetupConfigServicesRules } from "./swag-basic-setup-config-services-rules.interface";
import { ISwagBasicSetupConfigServicesVisit } from "./swag-basic-setup-config-services-visit-interface";

export interface ISwagBasicSetupConfigServices {
  rules: ISwagBasicSetupConfigServicesRules;
  visit: ISwagBasicSetupConfigServicesVisit;
}
