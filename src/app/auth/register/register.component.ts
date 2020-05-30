import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuild: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.formBuild.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  registroUsuario(){
    if (this.registerForm.invalid) {
      return;
    }
    const {username, email, password} = this.registerForm.value;
    this.authService.register(username, email, password)
        .then( async credenciales => {
          await Swal.fire({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 500
          })
          this.router.navigate(['/']);
        }).catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          })
        });
  }

}
