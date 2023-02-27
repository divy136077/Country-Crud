import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './../../../services/api-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  data: any;

  constructor(private router: Router , private serviceAPI: ApiService,) {}

  ngOnInit() {
    const auth = localStorage.getItem("authToken")
    if(auth){
      this.serviceAPI.getMenuName(auth).subscribe((res: any) => {
        // console.log("13",res  );
        this.data=res;
        });
    }

  }

  logout(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('loginData');
    this.router.navigateByUrl('/login');
  }
}
