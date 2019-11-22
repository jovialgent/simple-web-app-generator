import { ISwagBasicComponent } from '../models';
import { ISwagBasicLinkRender } from './models';
import { isEmpty } from 'lodash';
import { render } from 'mustache';

export class SwagBasicLink implements ISwagBasicComponent {
  private _emptyRenderData: ISwagBasicLinkRender = {
    body: '',
    tag: ''
  };

  constructor() {}

  getHTML(data?: ISwagBasicLinkRender): string {
    const templateData: ISwagBasicLinkRender = !!data
      ? data
      : this._emptyRenderData;
    const templateString = !isEmpty(data.template)
      ? data.template
      : this.getTemplate();

    return render(templateString, templateData);
  }
  getTemplate(): string {
    return `<a {{{tag}}}>{{{body}}}</a>`;
  }
}
