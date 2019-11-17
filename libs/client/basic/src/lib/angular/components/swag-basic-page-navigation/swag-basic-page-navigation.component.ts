import {
  AfterViewInit,
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

import { ISwagBasicPageNavigation } from '../../../components/swag-basic-page-navigation';
import { ISwagBasicVisit } from '../../../services';
import { NgSwagBasicActionsProcessService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'swag-basic-page-navigation',
  templateUrl: './swag-basic-page-navigation.component.html',
  styleUrls: ['./swag-basic-page-navigation.component.css']
})
export class SwagBasicPageNavigationComponent implements OnInit, AfterViewInit {
  @Input()
  public pageInfo: ISwagBasicPageNavigation;
  public load$: Observable<ISwagBasicVisit>;
  public linksLoad$: Observable<ISwagBasicVisit>;
  @ViewChild('vc', { read: ViewContainerRef, static: false })
  _container: ViewContainerRef;

  constructor(
    private _action: NgSwagBasicActionsProcessService,
   
  ) {}

  ngOnInit() {
    this.load$ = this._action.process$(this.pageInfo.onLoad);
    this.linksLoad$ = this._action.process$(this.pageInfo.onLinksLoad);
  }

  ngAfterViewInit(): void {
    
  }
}
