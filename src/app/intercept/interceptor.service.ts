// import { Injectable,Injector } from '@angular/core';
// import { HttpErrorResponse, HttpEvent ,HttpHandler , HttpInterceptor , HttpRequest , HttpResponse } from '@angular/common/http';
// import { catchError, observable ,throwError , BehaviorSubject , switchMap , filter,take, Observable } from 'rxjs'
// import {ServiceService} from '../services/api-services.service'
// import { ToastrService } from 'ngx-toastr';

// @Injectable({
//   providedIn: 'root'
// })
// export class InterceptorService implements HttpInterceptor {
//   errorMessage: any;
//   eMessage: any;


//   constructor( private inject:Injector  , private toastr: ToastrService, ) { }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const userToken = localStorage.getItem("authToken");
//     const modifiedReq = req.clone({ 
//       headers: req.headers.set('Authorization', `${userToken}`),
//     });
//     // return next.handle(modifiedReq);
  
//     return next.handle( modifiedReq)
//     .pipe(
//       catchError((error: HttpErrorResponse)=>{
//         const errorMessage = this.setError(error);
//         const eMessage = this.handleError(error)
//          this.errorMessage?.error(errorMessage);
//          this.eMessage?.error(eMessage);
//          return throwError(errorMessage );
        
//       })
//     );
//   }

  
//   setError(error:HttpErrorResponse): any {
//     // let errorMessage = 'Unknown error occured';
//     // if(error.error instanceof ErrorEvent){
//     //   //client
//     //   errorMessage = error.error.message;
//     // }else{
//     //   //server 
//     //   if(error.status!==0){

//     //     errorMessage= error.error;
//     //   }
     
//     // }
//     // return errorMessage;
    
//   }
 
//    handleError(error: HttpErrorResponse) {
//     let errorMessage = ''
//     if (error.status === 0) {
//       // A client-side or network error occurred. Handle it accordingly.
//       console.error('An error occurred:', error.error);
//     } else {
//       // The backend returned an unsuccessful response code.
//       // The response body may contain clues as to what went wrong.
//       console.error(
//         `Backend returned code ${error.status}, body was: `, error.error);
//       errorMessage = `Backend returned code ${error.status}, body was: `, error.error;
//       this.toastr.error(error.error.error);
//       // this.toastr.error(error.error)
//     }
//     // Return an observable with a user-facing error message.
//     errorMessage += 'Something bad happened; please try again later.'
//     return throwError(() => new Error(errorMessage));
//   }
// }
