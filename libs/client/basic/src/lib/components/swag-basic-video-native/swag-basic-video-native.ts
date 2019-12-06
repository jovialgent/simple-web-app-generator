import { ISwagBasicComponent } from '../models';
import { ISwagBasicVideoNativeRender } from './models';
import { isEmpty } from 'lodash';
import { render } from 'mustache';

export class SwagBasicVideoNative {
  private _emptyRenderData: ISwagBasicVideoNativeRender = {
    body: '',
    tag: ''
  };

  constructor() {}

  getHTML(data?: ISwagBasicVideoNativeRender, template?: string): string {
    const templateData: ISwagBasicVideoNativeRender = !!data
      ? data
      : this._emptyRenderData;
    const templateString = !isEmpty(data.template)
      ? data.template
      : this.getTemplate();

    return render(templateString, templateData);
  }

  getTemplate(): string {
    return `<video controls preload="metadata">
    <source src="http://www.example.com/waterfall-video.mp4" type="video/mp4"/>
    Video not supported.
</video>`;
  }
}
