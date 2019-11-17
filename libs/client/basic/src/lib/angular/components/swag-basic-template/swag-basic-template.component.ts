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
import {
  ISwagBasicPage,
  ISwagBasicPageHeader,
  ISwagBasicVisit
} from '../../..';

import { ISwagBasicTemplate } from '../../../components';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'swag-basic-swag-basic-template',
  templateUrl: './swag-basic-template.component.html',
  styleUrls: ['./swag-basic-template.component.css']
})
export class SwagBasicTemplateComponent implements OnInit, AfterViewInit {
  @ViewChild('swagTemplate', { read: ViewContainerRef, static: false })
  _container: ViewContainerRef;
  @Input() settings: ISwagBasicPageHeader;
  @Input() visit: ISwagBasicVisit;
  @Input() pageInfo: ISwagBasicPage;

  constructor(
    private _compiler: Compiler,
    private _injector: Injector,
    private _moduleRef: NgModuleRef<any>
  ) {}

  ngOnInit() {
    console.log(this.settings);
    console.log(this.visit);
    console.log(this.pageInfo);
  }

  ngAfterViewInit() {
    const templateVisit = cloneDeep(this.visit);
    const templateSettings = cloneDeep(this.settings);
    const templatePage = cloneDeep(this.pageInfo);
    const template = this.settings.html;
    const tmpCmp = Component({ template: template })(
      class {
        visit : ISwagBasicVisit = templateVisit;
        page : ISwagBasicPage = templatePage;
        settings: ISwagBasicTemplate = templateSettings;
      }
    );
    const tmpModule = NgModule({ declarations: [tmpCmp] })(class {});

    this._compiler
      .compileModuleAndAllComponentsAsync(tmpModule)
      .then(factories => {
        const f = factories.componentFactories[0];
        const cmpRef = f.create(this._injector, [], null, this._moduleRef);
       
        this._container.insert(cmpRef.hostView);
      });
  }
}
