import { ISwagBasicComponent } from '../models';
import { ISwagBasicPageHeaderRender } from './models/swag-basic-page-header-render.interface';
import { render } from 'mustache';

export class SwagBasicPageHeader implements ISwagBasicComponent {
  private _emptyRenderData: ISwagBasicPageHeaderRender = {
    body: '',
    tag: ''
  };
  constructor() {}

  getHTML(data?: ISwagBasicPageHeaderRender): string {
    const templateData: ISwagBasicPageHeaderRender = !!data
      ? data
      : this._emptyRenderData;
    const templateString = this.getTemplate();

    return render(templateString, templateData);
  }

  getTemplate(): string {
    return `<header {{{tag}}}>{{{body}}}</header>`;
  }
}
