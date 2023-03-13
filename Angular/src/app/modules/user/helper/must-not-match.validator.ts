import { AbstractControl } from '@angular/forms';

export class MustNotMatch {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchNotPassword(control: AbstractControl) {
    const password = control.get('newPassword').value;

    const currentPassword = control.get('oldPassword').value;

    if (password == currentPassword) {
      control.get('newPassword').setErrors({ currentPassword: true });
    } else {
      return null;
    }
  }
}
