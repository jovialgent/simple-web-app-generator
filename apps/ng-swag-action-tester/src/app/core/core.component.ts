import { Component, OnInit } from '@angular/core';
import {
  NgSwagBasicActionsProcessService,
  SwagBasicVisitManager,
  NgSwagBasicRulesService,
  NgSwagBasicClientManagerService,
  ISwagApp,
  ISwagBasicSetupConfig,
  SwagBasicActionConfigEventName,
  ISwagBasicActionConfigCreateVisit,
  ISwagBasicAction,
  ISwagBasicActionConfig,
  ISwagBasicActionConfigSetVisitServerData,
  ISwagBasicPageNavigation,
  NgSwagBasicUiClassesService,
  ISwagBasicPageClassesRuleObject,
  SwagBasicUi,
  NgSwagUiManagerService
} from '@simple-web-app-generator/client/basic';
import { Subject, Observable, pipe, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { config } from './app-setup';

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
    private _client: NgSwagBasicClientManagerService,
    private _uiClassService: NgSwagBasicUiClassesService,
    private _uiService: NgSwagUiManagerService
  ) {}

  public visitManager: SwagBasicVisitManager = new SwagBasicVisitManager();
  public actionProcessor$: Observable<any>;
  public sampleAction: ISwagBasicActionConfig;
  public pageInfo: ISwagBasicPageNavigation;

  ngOnInit() {
   
    this._client.setUpApp$(config).subscribe((data: ISwagApp) => {
      this.pageInfo = {
        id: 'test-navigation',
        path: '/test-navigation',
        footer: {
          id: 'test-navigation-footer',
          html: `<div id="footer-test">I am the footer. Some random data: {{visit?.current?.server?.data?.randomData}}</div>`,
          classes: <ISwagBasicPageClassesRuleObject[]>[
            {
              className: ['test-class', 'test-class-1']
            }
          ],

          data: {
            test: 'Data from settings'
          }
        },
        header: {
          id: 'test-navigation-header',
          html: `
        <div id="test">
          <h1>Test {{visit?.current?.data?.test}}</h1>
        </div>`,
          classes: <ISwagBasicPageClassesRuleObject[]>[
            {
              className: ['test-class', 'test-class-1']
            },
            {
              className: ['server-class', 'server-class-1'],
              rule: {
                conditionOperator: 'and',
                conditions: [
                  {
                    evaluatorType: 'basic',
                    key: 'server.data.test2',
                    is: 'equals',
                    value: 'YO'
                  }
                ]
              }
            }
          ]
        },
        onLoad: [
          {
            actionType: SwagBasicActionConfigEventName.Basic,
            eventName: SwagBasicActionConfigEventName.SetVisitData,
            args: {
              data: {
                loadedNav: true
              }
            }
          }
        ],
        onLinksLoad: [
          {
            actionType: SwagBasicActionConfigEventName.Basic,
            eventName: SwagBasicActionConfigEventName.SetVisitData,
            args: {
              data: {
                loadedLinksNav: true
              }
            }
          }
        ],
        links: [
          {
            id: 'my-test-link',
            url: 'https://www.google.com',
            html: 'My Label'
          }
        ]
      };
    });

    setTimeout(() => {
      this.sampleAction = <ISwagBasicActionConfigSetVisitServerData>{
        actionType: 'basic',
        eventName: SwagBasicActionConfigEventName.SetVisitServerData,
        args: {
          data: {
            fromClient: 'this came from data',
            randomData: Math.floor(Math.random() * 100),
            test2: "YO"
          },
          query: '?test=true'
        }
      };

      this.fireAction(this.sampleAction);
    }, 6000);
  }

  fireAction(action: ISwagBasicActionConfig) {
    this.actionProcessor.process([action]).then(data => {});
  }
}
