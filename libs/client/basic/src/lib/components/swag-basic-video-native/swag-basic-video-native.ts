import { ISwagBasicComponent, ISwagBasicVideoSetup } from '../models';

import { ISwagBasicVideoNativeRender } from './models';
import { SwagBasicVideoNativeService } from './services';
import { isEmpty } from 'lodash';
import { render } from 'mustache';

export class SwagBasicVideoNative {
  private _emptyRenderData: ISwagBasicVideoNativeRender = {
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
    return `<video {{{tag}}}></video>`;
  }

  createVideoService(): SwagBasicVideoNativeService {
    return new SwagBasicVideoNativeService();
  }
}
