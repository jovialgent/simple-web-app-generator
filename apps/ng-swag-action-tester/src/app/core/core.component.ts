import { Component, OnInit } from '@angular/core';
import {
  NgSwagBasicActionsProcessService,
  SwagBasicVisitManager,
  NgSwagBasicClientManagerService,
  ISwagApp,
  SwagBasicActionConfigEventName,
  ISwagBasicActionConfig,
  ISwagBasicActionConfigSetVisitServerData,
  ISwagBasicPageNavigation,
  ISwagBasicPageClassesRuleObject
} from '@simple-web-app-generator/client/basic';
import { Subject, Observable, pipe, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { config } from './app-setup';
import { ISwagBasicPageVideo } from 'libs/client/basic/src/lib/components/swag-basic-page-video/models';

@Component({
  selector: 'ng-swag-action-tester-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  public isCreated: boolean = false;
  constructor(
    public actionProcessor: NgSwagBasicActionsProcessService,
    private _client: NgSwagBasicClientManagerService
  ) {}

  public visitManager: SwagBasicVisitManager = new SwagBasicVisitManager();
  public actionProcessor$: Observable<any>;
  public sampleAction: ISwagBasicActionConfig;
  public pageInfo: ISwagBasicPageVideo;

  ngOnInit() {
    this._client.setUpApp$(config).subscribe((data: ISwagApp) => {
      this.pageInfo = {
        id: 'test-navigation',
        path: '/test-navigation',
        type: 'basic-video',
        footer: {
          id: 'test-navigation-footer',
          html: `<div id="footer-test">I am the footer. Some random data: {{visit?.current?.server?.data?.randomLeaveData}}</div>`,
          classes: [
            {
              className: ['test-class', 'test-class-1']
            }
          ],

          data: {
            test: 'Data from settings'
          },
          attributes: {
            '[ngStyle]': {
              background: 'green',
              color: 'blue',
              borderRadius: '4px',
              padding: '12px 16px'
            }
          }
        },
        header: {
          id: 'test-navigation-header',
          html: `
        <div id="test">
          <h1>Test {{visit?.current?.data?.test}}</h1>
        </div>`,
          attributes: {
            '[ngStyle]': "{background: 'blue'}"
          },
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
        onLeave: [
          {
            actionType: 'basic',
            eventName: SwagBasicActionConfigEventName.SetVisitServerData,
            args: {
              data: {
                randomLeaveData: Math.floor(Math.random() * 100)
              }
            }
          }
        ],
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
        player: {
          id: 'my-player',
          src: 'http://www.example.com/waterfall-video.mp4',
          type: 'basic-native'
        }
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
            test2: 'YO'
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
