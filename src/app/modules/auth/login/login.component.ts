import { Component, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/api-service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../../../core/base/common-base';
import { takeUntil } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastr.warning('Please fill in the required fields.');
      return;
    }

    this.spinner.show();
    this.loading = true;

    const { username, password } = this.loginForm.value;

    this.authService
      .login(username, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.spinner.hide();
          this.loading = false;
          this.toastr.success('Login Successfully!');
          this.router.navigate(['/admin/products']);
        },
        (error) => {
          this.spinner.hide();
          this.loading = false;
        }
      );
  }
}
