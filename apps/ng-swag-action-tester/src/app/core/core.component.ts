import { Component, OnInit } from '@angular/core';
import { NgSwagBasicActionsProcessService } from '@simple-web-app-generator/client/basic';

@Component({
  selector: 'ng-swag-action-tester-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  constructor(private _actionProcessor: NgSwagBasicActionsProcessService) {}

  ngOnInit() {
    this._actionProcessor.subscribe(() => {
      console.log('GOT HERE?');
    });
    this._actionProcessor.process$([]).subscribe(data => console.log(data));
  }
}
