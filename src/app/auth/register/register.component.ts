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
import { TipoDocumentoModel } from 'src/app/models/tipo-documento.model';
import { TipoDocumentoService } from 'src/app/services/tipo-documento/tipo-documento.service';
import { VacunaService } from 'src/app/services/vacuna/vacuna.service';
import { VacunaModel } from 'src/app/models/vacuna.model';
import { GeneroModel } from 'src/app/models/genero.model';
import { GeneroService } from 'src/app/services/genero/genero.service';
import Stepper from 'bs-stepper';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public formSubmitted: boolean = false;

  registroUnoFormGroup!: FormGroup;
  registroDosFormGroup!: FormGroup;
  registroTresFormGroup!: FormGroup;
  registroUno_step = false;
  registroDos_step = false;
  registroTres_step = false;
  step = 1;

  congregaciones: CongregacionModel[];
  congregacionSeleccionada: number;
  campos: CampoModel[];
  camposFiltrados: CampoModel[] = [];
  tipoDocumentos: TipoDocumentoModel[];
  vacunas: VacunaModel[];
  generos: GeneroModel[];

  congregacionSubscription: Subscription;
  campoSubscription: Subscription;
  tipoDocumentoSubscription: Subscription;
  vacunaSubscription: Subscription;
  generoSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private congregacionService: CongregacionService,
    private campoService: CampoService,
    private tipoDocumentoService: TipoDocumentoService,
    private vacunaService: VacunaService,
    private generoService: GeneroService
  ) {}

  ngOnInit(): void {
    this.registroUnoFormGroup = this.formBuilder.group({
      primer_nombre: ['ewewq', [Validators.required, Validators.minLength(3)]],
      segundo_nombre: ['ewqewq', [Validators.minLength(3)]],
      primer_apellido: ['qwew', [Validators.required, Validators.minLength(3)]],
      segundo_apellido: ['qwe', [Validators.minLength(3)]],
      id_tipoDocumento: ['1', [Validators.required]],
      numero_documento: ['123123', [Validators.required, Validators.minLength(3)]],
    });

    this.registroDosFormGroup = this.formBuilder.group({
      fecha_nacimiento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.minLength(3)]],
      id_genero: ['', [Validators.required]],
    });

    this.registroTresFormGroup = this.formBuilder.group({
      id_vacuna: ['', [Validators.required]],
      imagen: ['', []],
      id_congregacion: ['', [Validators.required]],
      campo: ['', [Validators.required]],
      terminos: [true, [Validators.required]],
    });

    this.congregacionSubscription = this.congregacionService.listarCongregaciones().subscribe((congregacion) => {
      this.congregaciones = congregacion;
    });

    this.campoSubscription = this.campoService.listarCampos().subscribe((campos: CampoModel[]) => {
      this.campos = campos;
    });

    this.tipoDocumentoSubscription = this.tipoDocumentoService
      .listarTipoDocumento()
      .subscribe((tipoDocumento: TipoDocumentoModel[]) => {
        this.tipoDocumentos = tipoDocumento;
      });

    this.vacunaSubscription = this.vacunaService.listarVacunas().subscribe((vacuna: VacunaModel[]) => {
      this.vacunas = vacuna;
    });

    this.generoSubscription = this.generoService.listarGenero().subscribe((genero: GeneroModel[]) => {
      this.generos = genero;
    });
    console.log('this.step ', this.step);
  }

  get registroUno() {
    return this.registroUnoFormGroup.controls;
  }
  get registroDos() {
    return this.registroDosFormGroup.controls;
  }
  get registroTres() {
    return this.registroTresFormGroup.controls;
  }

  ngOnDestroy(): void {
    this.congregacionSubscription.unsubscribe();
    this.campoSubscription.unsubscribe();
    this.tipoDocumentoSubscription.unsubscribe();
    this.vacunaSubscription.unsubscribe();
    this.generoSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.itemSeleccionado) {
      //   this.itemSeleccionado =
      //     changes.itemSeleccionado.currentValue instanceof PoModel
      //       ? changes.itemSeleccionado.currentValue.itemParentId
      //       : changes.itemSeleccionado.currentValue;
      // }
    }
  }

  // crearUsuario() {
  //   this.formSubmitted = true;

  //   // if (this.registerForm.invalid) {
  //   //   return;
  //   // }

  //   // Realizar el posteo
  //   // this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
  //   //   (respuestaUsuario) => {
  //   //     //Navegar al Dashboard
  //   //     Swal.fire('Usuario', respuestaUsuario.msg, 'success');
  //   //     this.router.navigateByUrl('/');
  //   //   },
  //   //   (err) => {
  //   //     // Si sucede un error
  //   //     Swal.fire('Error', err.error.msg, 'error');
  //   //   }
  //   // );
  // }

  // // campoNoValido(campo: string): boolean {
  // //   if (this.registerForm.get(campo).invalid && this.formSubmitted) {
  // //     return true;
  // //   } else {
  // //     return false;
  // //   }
  // // }

  listarCampos(congregacion: string) {
    this.camposFiltrados = this.campos.filter((campoBuscar) => campoBuscar.id_congregacion === parseInt(congregacion));
  }

  next() {
    if (this.step == 1) {
      this.registroUno_step = true;
      if (this.registroUnoFormGroup.invalid) {
        return;
      }
      this.step++;
      return;
    }
    if (this.step == 2) {
      this.registroDos_step = true;
      if (this.registroDos.invalid) {
        return;
      }
      this.step++;
    }
  }

  previous() {
    this.step--;
    if (this.step == 1) {
      this.registroUno_step = false;
    }
    if (this.step == 2) {
      this.registroDos_step = false;
    }
  }

  aceptaTerminos() {
    return !this.registroTresFormGroup.get('terminos').value && this.formSubmitted;
  }

  submit() {
    if (this.step == 3) {
      this.registroTres_step = true;

      this.formSubmitted = true;

      let informacionFormulario = Object.assign(
        this.registroUnoFormGroup.value,
        this.registroDosFormGroup.value,
        this.registroTresFormGroup.value
      );

      // Realizar el posteo
      this.usuarioService.crearUsuario(informacionFormulario).subscribe(
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

      if (this.registroTres.invalid) {
        return;
      }
    }
  }
}
