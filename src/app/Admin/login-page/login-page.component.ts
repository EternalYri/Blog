import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/components/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  submited = false;
  message: string;

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      if(params['loginAgain']) {
        this.message = 'Пожалуйста авторизуйтесь';
      } else if (params['authFailed']) {
        this.message = 'Сессия истекла, введите данные занаво'
      }
    })
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }
  onSubmit() {
    if(this.form.invalid) {
      return
    }
    this.submited = true;
    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    }
    this.auth.login(user).subscribe(()=>{
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard'])
      this.submited = false;
    })
  }
}
