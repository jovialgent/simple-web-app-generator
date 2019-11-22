import { SwagBasicLink } from './swag-basic-link';
import { SwagBasicPageFooter } from './swag-basic-page-footer';
import { SwagBasicPageHeader } from './swag-basic-page-header';

export class SwagBasicUiTemplate {
  //#region Page Components
  pageHeader: SwagBasicPageHeader;
  pageFooter: SwagBasicPageFooter;
  //#endregion Page Components
  //#region Site Components
  siteLink: SwagBasicLink;
  //#endregion Site Components
  constructor() {
    //#region Register Components
    this.pageHeader = new SwagBasicPageHeader();
    this.pageFooter = new SwagBasicPageFooter();
    this.siteLink = new SwagBasicLink();
    //#endregion Register Components
  }

  getUIComponents(): any {
    return this._getUIComponents();
  }

  private _getUIComponents() {
    return {
      page: {
        header: this.pageHeader,
        footer: this.pageFooter
      },
      site: {
        link: this.siteLink
      }
    };
  }
}

export const SwagBasicUi = new SwagBasicUiTemplate();
