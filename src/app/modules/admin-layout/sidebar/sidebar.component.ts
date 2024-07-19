import { Component } from '@angular/core';
import { ComponentBase } from '../../../core/base/common-base';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/api-service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent extends ComponentBase {
  isCollapsed: boolean =false;

  constructor(private authService: AuthService, private toastr: ToastrService) {
    super();
  }
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  signOut() {
    this.authService.logout();
    this.toastr.warning('signout Successfully!');
  }
}
