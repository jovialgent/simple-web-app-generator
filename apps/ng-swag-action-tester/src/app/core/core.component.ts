import { Component, OnInit } from '@angular/core';
import {
  NgSwagBasicActionsProcessService,
  SwagBasicInstanceManager,
  ISwagBasicInstance
} from '@simple-web-app-generator/client/basic';
import { Subject, Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'ng-swag-action-tester-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  constructor(public actionProcessor: NgSwagBasicActionsProcessService) {}

  public instance$: Observable<ISwagBasicInstance>;
  public instanceManager: SwagBasicInstanceManager = new SwagBasicInstanceManager();
  public actionProcessor$: Observable<any>;
  public config: any;

  ngOnInit() {
    this.actionProcessor$ = this.actionProcessor.getProcessor();
    this.config = {
      id: 'test'
    };
  }

  createInstance(config) {
    this.instance$ = this.actionProcessor
      .process$([
        {
          eventName: 'createInstance',
          args: {
            config
          }
        }
      ])
      .pipe(
        tap(() => {
          this.actionProcessor.process([
            {
              eventName: 'setInstanceData',
              args: {
                data: {
                  test: 1,
                  test2: 2
                }
              }
            }
          ]);
        })
      );
  }
}
