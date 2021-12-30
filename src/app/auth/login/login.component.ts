import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService) {}

  public loginForm = this.formBuilder.group({
    login: [sessionStorage.getItem('login') || '', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(3)]],
    remember: [false],
  });

  ngOnInit(): void {
    this.usuarioService.listarUsuarios().subscribe(
      (res) => console.log(res),
      (err) => console.error(err)
    );
    console.log();
  }

  login() {
    this.usuarioService.login(this.loginForm.value).subscribe(
      (loginUsuario) => {
        if (this.loginForm.get('remember').value) {
          sessionStorage.setItem('login', this.loginForm.get('login').value);
        } else {
          sessionStorage.removeItem('login');
        }
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido ' + this.loginForm.get('login').value,
          showConfirmButton: false,
          timer: 1500,
        });
        // Navegar al Dashboard
        this.router.navigateByUrl('/');
        console.log(loginUsuario);
      },
      (err) => {
        Swal.fire({ icon: 'error', html: err.error.msg });
      }
    );
  }
}
