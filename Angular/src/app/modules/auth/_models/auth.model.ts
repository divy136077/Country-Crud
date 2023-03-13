export class AuthModel {
  authToken: string;

  setAuth(auth: any) {
    this.authToken = auth.token;
  }
}
