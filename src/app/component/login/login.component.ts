import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/api-services.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any;
  submitted = false;
  error?: string;


  get email() {
    return this.loginForm.get('Email')
  }

  constructor(
    private fb: FormBuilder,
    public http: HttpClient,
    private serviceAPI: ServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      Password: ['', [Validators.required, Validators.minLength(5)]]
    });

  }
  get field() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.error = ''
      
    const data: any = {};
    data.Email = this.loginForm.value.Email;
    data.Password = this.loginForm.value.Password;
    this.serviceAPI.login(data).subscribe({next: ((response: any) =>
      
      {localStorage.setItem('authToken', response[1]);
      localStorage.setItem('loginData', JSON.stringify(response[0]));
      // console.log("tyty" , response);
    this.router.navigateByUrl('/user')
    
    this.toastr.success('Login Successful!');
    }

    ),
    error: ((error: any) =>{
      this.toastr.error(error.error.message);
    }
    ),}
    )

  }
  userEdit(id: any) {
    this.router.navigateByUrl('/user/edit/' + id)
  }

  // reloadCurrentPage(){
  //   window.location.reload();
  // }

}
