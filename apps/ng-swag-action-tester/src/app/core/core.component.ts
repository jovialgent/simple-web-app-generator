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
  ISwagBasicPageClassesRuleObject,
  NgSwagBasicEventBusService,
  NgSwagBasicTimeupdateService,
  SwagBasicVideoEventName,
  ISwagBasicVideoEventArgs
} from '@simple-web-app-generator/client/basic';
import { Subject, Observable, pipe, of, animationFrameScheduler } from 'rxjs';
import { tap, delay, repeat } from 'rxjs/operators';
import { config } from './app-setup';
import { ISwagBasicPageVideo } from 'libs/client/basic/src/lib/components/swag-basic-page-video/models';
import { ISwagBasicUiTimeupdate } from 'libs/client/basic/src/lib/services/ui/models/swag-basic-ui-timeupdate.interface';

@Component({
  selector: 'ng-swag-action-tester-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  public isCreated: boolean = false;
  constructor(
    public actionProcessor: NgSwagBasicActionsProcessService,
    private _client: NgSwagBasicClientManagerService,
    private _bus: NgSwagBasicEventBusService,
    private _timeupdate: NgSwagBasicTimeupdateService
  ) {}

  public visitManager: SwagBasicVisitManager = new SwagBasicVisitManager();
  public actionProcessor$: Observable<any>;
  public sampleAction: ISwagBasicActionConfig;
  public pageInfo: ISwagBasicPageVideo;
  public currentTime: string = '00:00';
  public duration: string = '00:00';

  ngOnInit() {
    this._client.setUpApp$(config).subscribe((data: ISwagApp) => {
      this.pageInfo = {
        id: 'test-navigation',
        path: '/test-navigation',
        type: 'basic-video',
        footer: {
          id: 'test-navigation-footer',
          html: `<div id="footer-test">
          Current Video Status: {{visit?.current?.data?.videoStatus}}
          </div>`,
          classes: [
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
          src:
            'https://simple-web-application-gen-cdn.com/demo/videos/test-video.mp4',
          type: 'basic-native',
          attributes: {
            controls: 'true'
          },
          onPlay: [
            {
              actionType: SwagBasicActionConfigEventName.Basic,
              eventName: SwagBasicActionConfigEventName.SetVisitData,
              args: {
                data: {
                  videoStatus: 'Playing'
                }
              }
            }
          ],
          onPause: [
            {
              actionType: SwagBasicActionConfigEventName.Basic,
              eventName: SwagBasicActionConfigEventName.SetVisitData,
              args: {
                data: {
                  videoStatus: 'Paused'
                }
              }
            }
          ],
          onVolumeChange: [
            {
              actionType: SwagBasicActionConfigEventName.Basic,
              eventName: SwagBasicActionConfigEventName.SetVisitData,
              args: {
                data: {
                  videoVolumeStatus: 'Changed'
                }
              }
            }
          ]
        }
      };
    });

    this._bus.on(
      SwagBasicVideoEventName.Timeupdate,
      (args: ISwagBasicVideoEventArgs) => {
        this.duration = args.durationTimestamp;
        this.currentTime = args.timestamp;
      }
    );
  }

  fireAction(action: ISwagBasicActionConfig) {
    this.actionProcessor.process([action]).then(data => {});
  }

  clickButton() {
    this._bus.emit(SwagBasicVideoEventName.Play, {});
  }

  play() {
    this._bus.emit(SwagBasicVideoEventName.Play, { id: 'my-player' });
  }
  pause() {
    this._bus.emit(SwagBasicVideoEventName.Pause, { id: 'my-player' });
  }
  mute() {
    this._bus.emit(SwagBasicVideoEventName.Mute, { id: 'my-player' });
  }
  unmute() {
    this._bus.emit(SwagBasicVideoEventName.Unmute, { id: 'my-player' });
  }
  setVolume() {
    this._bus.emit(SwagBasicVideoEventName.SetVolume, {
      level: 0.25,
      id: 'my-player'
    });
  }
  seek() {
    this._bus.emit(SwagBasicVideoEventName.Seek, { currentTime: 6 });
  }
  replay() {
    this._bus.emit(SwagBasicVideoEventName.Replay, {});
  }
  destroy() {
    this._bus.emit(SwagBasicVideoEventName.Destroy, {});
  }
}
