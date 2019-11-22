import { ISwagBasicComponent } from '../models';
import { ISwagBasicPageFooterRender } from './models';
import { isEmpty } from 'lodash';
import { render } from 'mustache';

export class SwagBasicPageFooter implements ISwagBasicComponent {
  private _emptyRenderData: ISwagBasicPageFooterRender = {
    body: '',
    tag: '',
    template: this.getTemplate()
  };

  constructor() {}

  public getHTML(data?: ISwagBasicPageFooterRender): string {
    const templateData: ISwagBasicPageFooterRender = !!data
      ? data
      : this._emptyRenderData;
    const templateString = !!templateData.template
      ? templateData.template
      : this.getTemplate();

    return render(templateString, templateData);
  }

  public getTemplate(): string {
    return `<footer {{{tag}}}>{{{body}}}</footer>`;
  }
}
