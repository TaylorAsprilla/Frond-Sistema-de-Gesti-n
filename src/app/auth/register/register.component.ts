import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { CongregacionService } from 'src/app/services/congregacion/congregacion.service';
import { Subscription } from 'rxjs';
import { CongregacionModel } from 'src/app/models/congregacion.model';
import { CampoService } from 'src/app/services/campo/campo.service';
import { CampoModel } from 'src/app/models/campo.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public formSubmitted: boolean = false;
  public registerForm = this.formBuilder.group(
    {
      primer_nombre: ['', [Validators.required, Validators.minLength(3)]],
      segundo_nombre: ['', [Validators.minLength(3)]],
      primer_apellido: ['', [Validators.required, Validators.minLength(3)]],
      segundo_apellido: ['', [Validators.minLength(3)]],
      id_tipoDocumento: ['', [Validators.required]],
      numero_documento: ['', [Validators.required, Validators.minLength(3)]],
      fecha_nacimiento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.minLength(3)]],
      id_genero: ['', [Validators.required]],
      id_vacuna: ['', [Validators.required]],
      imagen: ['', []],
      id_congregacion: ['', [Validators.required]],
      campo: ['', [Validators.required]],
      terminos: [true, [Validators.required]],
    }
    // {
    //   validators: this.passwordsIguales('password', 'password2'),
    // }
  );

  // congregacionSeleccionada: CongregacionModel;
  congregaciones: CongregacionModel[];
  congregacionSeleccionada: number;
  campos: CampoModel[];
  camposFiltrados: CampoModel[] = [];

  congregacionSubscription: Subscription;
  campoSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private congregacionService: CongregacionService,
    private campoService: CampoService
  ) {}

  ngOnInit(): void {
    this.congregacionSubscription = this.congregacionService.listarCongregaciones().subscribe((congregacion) => {
      this.congregaciones = congregacion;
      console.log(this.congregaciones && this.congregacionSeleccionada);
    });

    this.campoSubscription = this.campoService.listarCampos().subscribe((campos: CampoModel[]) => {
      this.campos = campos;
    });
  }

  ngOnDestroy(): void {
    this.congregacionSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (!!changes.itemSeleccionado) {
      //   this.itemSeleccionado =
      //     changes.itemSeleccionado.currentValue instanceof PoModel
      //       ? changes.itemSeleccionado.currentValue.itemParentId
      //       : changes.itemSeleccionado.currentValue;
      // }
    }
  }

  crearUsuario() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
      (respuestaUsuario) => {
        //Navegar al Dashboard
        Swal.fire('Usuario', respuestaUsuario.msg, 'success');
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

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  listarCampos(congregacion: string) {
    this.camposFiltrados = this.campos.filter((campoBuscar) => campoBuscar.id_congregacion === parseInt(congregacion));
  }
}
