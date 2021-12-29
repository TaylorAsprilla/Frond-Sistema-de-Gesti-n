import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public formSubmitted: boolean = false;
  public registerForm = this.formBuilder.group(
    {
      primerNombre: ['Prueba Nombre', [Validators.required, Validators.minLength(3)]],
      segundoNombre: ['', [Validators.minLength(3)]],
      primerApellido: ['Prueba', [Validators.required, Validators.minLength(3)]],
      segundoApellido: ['', [Validators.minLength(3)]],
      email: ['ta@gmail.com', [Validators.required, Validators.email]],
      password: ['12345', [Validators.required, Validators.minLength(3)]],
      password2: ['12345', [Validators.required, Validators.minLength(3)]],
      terminos: [true, [Validators.required]],
    },
    {
      validators: this.passwordsIguales('password', 'password2'),
    }
  );

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {}

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (resp) => {
        //Navegar al Dashboard
        this.router.navigateByUrl('/');
      },
      (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasnasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(password: string, password2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(password);
      const pass2Control = formGroup.get(password2);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }
}
