import { Component, OnInit } from '@angular/core';
import { NgSwagActionProcessorService } from '@simple-web-app-generator/client/actions';

@Component({
  selector: 'ng-swag-action-tester-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  constructor(private _actionProcessor: NgSwagActionProcessorService) {}

  ngOnInit() {
    this._actionProcessor.process$().subscribe(data => {
      console.log(data);
    });
  }
}
