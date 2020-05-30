import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logoff(){
    this.auth.logoff()
      .then(dato => {
        console.log(dato);
        console.log("Sesion cerrada con exito!!!")
        this.router.navigate(['/login']);
      })
  }
}
