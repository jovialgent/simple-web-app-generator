import { Component, OnInit } from '@angular/core';
import {
  NgSwagBasicActionsProcessService,
  SwagBasicVisitManager,
  ISwagBasicVisit
} from '@simple-web-app-generator/client/basic';
import { Subject, Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  SwagBasicActionConfigEventName,
  ISwagBasicActionConfigCreateVisit
} from 'libs/client/basic/src/lib/services/actions/models';

@Component({
  selector: 'ng-swag-action-tester-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  constructor(public actionProcessor: NgSwagBasicActionsProcessService) {}

  public visitManager: SwagBasicVisitManager = new SwagBasicVisitManager();
  public actionProcessor$: Observable<any>;
  public config: any;

  ngOnInit() {
    this.actionProcessor$ = this.actionProcessor.getProcessor();
  }

  createVisit(config) {
    const createVisitAction: ISwagBasicActionConfigCreateVisit = {
      eventName: SwagBasicActionConfigEventName.CreateVisit,
      args: {
        config: {
          id: '123'
        }
      }
    };

    this.actionProcessor.process([createVisitAction]).then(() => {
      this.actionProcessor.process([
        {
          eventName: SwagBasicActionConfigEventName.SetVisitData,
          args: {
            data: {
              test: 1,
              test2: 2,
              test3: {
                test4: {
                  test5: [
                    {
                      test1: true
                    },
                    {
                      test2: false
                    }
                  ]
                }
              }
            }
          }
        }
      ]);
    });
  }
}
