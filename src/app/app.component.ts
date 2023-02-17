import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from './api-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'country';
  data: any ;
  
  constructor(private router: Router , private serviceAPI: ServiceService,) {}

  ngOnInit() {
    const loginData:any = localStorage.getItem('loginData')
    this.data=JSON.parse(loginData)?.menuId;
    console.log(this.data)
    // console.log("kkk",this.data);
  }

  logout(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('loginData');
    this.router.navigateByUrl('/login');
  }


}
