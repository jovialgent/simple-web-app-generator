import {
  ISwagBasicLink,
  ISwagBasicPageNavigationRule
} from '../../../components';
import { get, isEmpty } from 'lodash';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwagBasicSiteLinkService {
  constructor() {}

  public navigate(anchor: HTMLAnchorElement, settings: ISwagBasicLink): void {
    const openInNewTab: boolean = this.shouldOpenInNewTab(settings);

    if (!openInNewTab) window.location.href = anchor.href;
  }

  public shouldOpenInNewTab(settings: ISwagBasicLink): boolean {
    const target = get(settings, 'attributes.target');

    return !!target && target === '_blank';
  }

  public getUrlTags(
    linkSettings: ISwagBasicLink
  ): { url: string; route: string } {
    const routeTags = this._getRouteObjectFromObj({
      url: linkSettings.url,
      route: linkSettings.route
    });

    return routeTags;
  }

  private _getRouteObjectFromObj(
    linkSettings: ISwagBasicPageNavigationRule
  ): { url: string; route: string } {
    const hasUrl = !isEmpty(linkSettings.url);
    const hasRoute = !isEmpty(linkSettings.route);
    const url = hasUrl && !hasRoute ? this._getUrlTag(linkSettings.url) : '';
    const route =
      hasRoute && !hasUrl ? this._getRouteTag(linkSettings.route) : '';

    return {
      url,
      route
    };
  }

  private _getUrlTag(url: string): string {
    return `href="${url}"`;
  }

  private _getRouteTag(route: string): string {
    return `[route]="[${route}]"`;
  }
}
