import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private formBuild: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(){
    if (this.formLogin.invalid) {
        return;
    }
    Swal.fire({
      title: 'Loading',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    })
    const {email, password} = this.formLogin.value;
    this.auth.login(email, password)
      .then(status => {
        Swal.close();
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
