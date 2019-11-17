import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SwagBasicPageFooterComponent } from './swag-basic-page-footer/swag-basic-page-footer.component';
import { SwagBasicPageHeaderComponent } from './swag-basic-page-header/swag-basic-page-header.component';
import { SwagBasicPageNavigationComponent } from './swag-basic-page-navigation/swag-basic-page-navigation.component';
import { SwagBasicTemplateComponent } from './swag-basic-template/swag-basic-template.component';

const exports = [SwagBasicPageNavigationComponent];

@NgModule({
  declarations: [
    SwagBasicPageNavigationComponent,
    // SwagBasicTemplateComponent,
    SwagBasicPageHeaderComponent,
    SwagBasicPageFooterComponent
  ],
  imports: [CommonModule],
  exports
})
export class SwagBasicComponentsModule {}
