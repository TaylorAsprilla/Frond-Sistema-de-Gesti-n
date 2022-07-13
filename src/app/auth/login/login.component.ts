import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  faLock = faLock;
  faUser = faUser;
  fieldTextType: boolean;

  usuariosSubscription: Subscription;

  public loginForm = this.formBuilder.group({
    login: [localStorage.getItem('login') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [localStorage.getItem('login') ? true : false],
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuariosSubscription = this.usuarioService.listarUsuarios().subscribe(
      (res) => console.log(res),
      (err) => console.error(err)
    );
  }

  ngOnDestroy(): void {
    this.usuariosSubscription?.unsubscribe();
  }

  login() {
    this.usuarioService.login(this.loginForm.value).subscribe(
      (loginUsuario) => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('login', this.loginForm.get('login').value);
        } else {
          localStorage.removeItem('login');
        }
        Swal.fire({
          icon: 'success',
          title: 'Usuario: ' + this.loginForm.get('login').value,
          html: 'Bienvenido',
          showConfirmButton: false,
          timer: 1500,
        });
        // Navegar al Dashboard
        this.router.navigateByUrl('/');
      },
      (err) => {
        if (!!err.error.errors) {
          let errores = err.error.errors;
          let listaErrores = [];

          Object.entries(errores).forEach(([key, value]) => {
            listaErrores.push('° ' + value['msg'] + '<br>');
          });

          Swal.fire({
            title: 'Error al iniciar sesión',
            icon: 'error',
            html: `${listaErrores.join('')}`,
          });
        } else {
          Swal.fire({
            title: 'Error al iniciar sesión',
            icon: 'error',
            html: `${err.error.msg}`,
          });
        }
      }
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
