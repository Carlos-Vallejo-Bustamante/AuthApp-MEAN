import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.formbuilder.group({
    name: ['', [Validators.required, Validators.nullValidator]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private formbuilder: FormBuilder) { }

  registro() {
    console.log(this.miFormulario.valid);
    console.log(this.miFormulario.value);

  }

}
