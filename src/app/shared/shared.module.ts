import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectiveModule } from '../directive/directive.module';

@NgModule({
  declarations: [BreadcrumbsComponent, FooterComponent, HeaderComponent, SidebarComponent],
  exports: [BreadcrumbsComponent, FooterComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, RouterModule, FormsModule, FontAwesomeModule, DirectiveModule],
})
export class SharedModule {}
