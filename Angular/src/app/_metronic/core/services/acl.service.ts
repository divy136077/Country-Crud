import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root'
})
export class AclService {
	userPermissionList: any = [];
	userModule: any = [];
	premission: boolean = false;
	premissionCheck: boolean = false;
	objPermission: any = 0;
	datamoduleArr = 0;
	isDataModuleArray = false;
	authToken = localStorage.getItem('authToken');
	token = this.authToken.split(' ')[1];
	constructor(private router: Router) {
		this.getDecodedAccessToken();
	}
	checkPermission(data) {
		this.userPermissionList = JSON.parse(
			localStorage.getItem('permissions')
		);
		if (this.userPermissionList.length > 0) {
			this.userModule = this.userPermissionList;
			for (let i = 0; i < this.userModule.length; i++) {
				if (typeof data.module === 'string') {
					if (
						data.module.toLowerCase() ===
						this.userModule[i].Module.module_name.toLowerCase()
					) {
						switch (data.permission) {
							case 'create':
								this.premission = this.userModule[
									i
								].create_permission;
								this.premissionCheck = true;
								break;
							case 'read':
								this.premission = this.userModule[
									i
								].read_permission;
								this.premissionCheck = true;
								break;
							case 'update':
								this.premission = this.userModule[
									i
								].update_permission;
								this.premissionCheck = true;
								break;
							case 'delete':
								this.premission = this.userModule[
									i
								].delete_permission;
								this.premissionCheck = true;
								break;
							case 'menu':
								this.premission = this.userModule[
									i
								].menu_display;
								this.premissionCheck = true;
								break;
							default:
						}
					}
					this.isDataModuleArray = false;
					this.datamoduleArr = 0;
					this.objPermission = 0;
				} else {
					this.isDataModuleArray = true;
					this.datamoduleArr = data.module.length;
					for (let k = 0; k < data.module.length; k++) {
						if (
							data.module[k].toLowerCase() ===
							this.userModule[i].Module.module_name.toLowerCase()
						) {
							if (data.permission === 'menu') {
								// case 'menu':
								if (this.userModule[i].menu_display) {
									this.objPermission++;
								}
								// 	break;
								// default:
							}
						}
					}
				}
			}
			if (this.isDataModuleArray) {
				if (this.datamoduleArr > 0) {
					if (this.objPermission > 0) {
						if (this.objPermission === this.datamoduleArr) {
							this.premission = true;
						}
					} else {
						this.premission = false;
					}
				}
			}
		}
		return this.premission;
	}

	getDecodedAccessToken() {
		this.authToken = localStorage.getItem('authToken');
		this.token = this.authToken;
		// this.authToken = localStorage.getItem('authToken');
		// this.token = this.authToken.split(' ')[1];
		return jwt_decode(this.token);
	}
}
