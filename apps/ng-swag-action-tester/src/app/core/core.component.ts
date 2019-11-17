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
  ISwagBasicPageNavigation
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
    private _client: NgSwagBasicClientManagerService
  ) {}

  public visitManager: SwagBasicVisitManager = new SwagBasicVisitManager();
  public actionProcessor$: Observable<any>;
  public sampleAction: ISwagBasicActionConfig;
  public pageInfo: ISwagBasicPageNavigation;

  ngOnInit() {
    this.sampleAction = <ISwagBasicActionConfigSetVisitServerData>{
      actionType: 'basic',
      eventName: SwagBasicActionConfigEventName.SetVisitServerData,
      args: {
        data: {
          fromClient: 'this came from data',
          randomData: Math.floor(Math.random() * 100)
        },
        query: '?test=true'
      }
    };
    this._client.setUpApp$(config).subscribe((data: ISwagApp) => {
      console.log(data);
    });

    this.pageInfo = {
      id: 'test-navigation',
      path: '/test-navigation',
      header: {
        id: 'test-navigation-header',
        html: `
        <div id="test">
          <h1>Test</h1>
        </div>`
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
          label: 'My Label'
        }
      ]
    };
  }

  fireAction(action: ISwagBasicActionConfig) {
    this.actionProcessor.process([action]).then(data => {
      console.log(data);
    });
  }
}
