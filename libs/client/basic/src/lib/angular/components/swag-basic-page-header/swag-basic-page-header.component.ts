import {
  Compiler,
  Component,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ISwagBasicPage, ISwagBasicPageHeader } from '../../../components';

import { ISwagBasicVisit } from '../../../services';

@Component({
  selector: 'swag-basic-swag-basic-page-header',
  templateUrl: './swag-basic-page-header.component.html',
  styleUrls: ['./swag-basic-page-header.component.css']
})
export class SwagBasicPageHeaderComponent implements OnInit {
  @Input() settings: ISwagBasicPageHeader;
  @Input() visit: ISwagBasicVisit;
  @Input() pageInfo: ISwagBasicPage;

  @ViewChild('swagTemplate', { read: ViewContainerRef, static: false })
  _container: ViewContainerRef;

  constructor(
    private _compiler: Compiler,
    private _injector: Injector,
    private _moduleRef: NgModuleRef<any>
  ) {}

  ngOnInit() {
   
  }

  ngAfterViewInit() {}
}
