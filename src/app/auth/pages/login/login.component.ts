import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  login() {
    const { email, password } = this.miFormulario.value;

    this.authService.login(email, password)
      .subscribe(ok => {
        console.log(ok)

        if (ok) {
          this.router.navigateByUrl('/dashboard');
        } else {
          //TODO
        }
      });

  }

}
