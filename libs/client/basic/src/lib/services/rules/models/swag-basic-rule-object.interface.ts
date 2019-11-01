import { ISwagBasicRule } from './swag-basic-rule.interface';

export interface ISwagBasicRuleObject{
    rule? : ISwagBasicRule
    [propName: string] : any;
}