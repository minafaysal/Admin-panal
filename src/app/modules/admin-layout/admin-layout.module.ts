import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminLayoutComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, AdminLayoutRoutingModule, RouterModule],
  exports: [],
})
export class AdminLayoutModule {}
