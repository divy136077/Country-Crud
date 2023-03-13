import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { AclService } from '../../../_metronic/core/services/acl.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleGuard implements CanActivate {
  constructor(private router: Router,
    private aclService: AclService
) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let tokenData: any = this.aclService.getDecodedAccessToken();
console.log(17, tokenData.device_token.permissions);

    const permissionArr = tokenData.device_token.user_permission ? JSON.parse(tokenData.device_token.user_permission) : JSON.parse(tokenData.device_token.permissions);
    console.log(19, permissionArr);
    const permission = permissionArr[0]
    const finObj = Object.values(permission);
    const arr = [];
    const data  = Object.assign({},...finObj);      
    console.log(340,data);  
    const moduleName = route.data['moduleName'] as string;
    console.log(27,moduleName);
    
    if (!moduleName) {
        return of(false);
    } else if (permission) {
        let permissions = data;
        if (permissions.hasOwnProperty(moduleName[0])) {
            if (permissions[moduleName[0]].includes(moduleName[1])) {
                return of(true);
            } else {
                this.router.navigateByUrl('/error/403');
                return of(false);
            }
        } else {
            this.router.navigateByUrl('/error/403');
            return of(false);
        }
    } else {
        this.router.navigateByUrl('/error/403');
        return of(false);
    }
}
  
}
