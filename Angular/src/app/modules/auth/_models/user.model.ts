import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {
  id: number;
  username: string;
  password: string;
  // fullname: string;
  email: string;
  profile_image: string;
  // roles: number[];
  // occupation: string;
   companyName: string;
  phone: string;
  // address?: AddressModel;
  // socialNetworks?: SocialNetworksModel;
  // personal information
  first_name: string;
  last_name: string;
   website: string;
  // account information
  // language: string;
  // timeZone: string;
  // communication: {
  //   email: boolean,
  //   sms: boolean,
  //   phone: boolean
  // };
  // email settings
  emailSettings: {
    emailNotification: boolean,
    sendCopyToPersonalEmail: boolean,
    activityRelatesEmail: {
      youHaveNewNotifications: boolean,
      youAreSentADirectMessage: boolean,
      someoneAddsYouAsAsAConnection: boolean,
      uponNewOrder: boolean,
      newMembershipApproval: boolean,
      memberRegistration: boolean
    },
    updatesFromKeenthemes: {
      newsAboutKeenthemesProductsAndFeatureUpdates: boolean,
      tipsOnGettingMoreOutOfKeen: boolean,
      thingsYouMissedSindeYouLastLoggedIntoKeen: boolean,
      newsAboutMetronicOnPartnerProductsAndOtherServices: boolean,
      tipsOnMetronicBusinessProducts: boolean
    }
  };

  setUser(user: any) {
    this.id = user.id;
    this.username = user.username || '';
    this.password = user.password || '';
    this.first_name = user.first_name || '';
    this.last_name = user.last_name || '';
    this.email = user.email || '';
    this.profile_image = user.profile_image || './assets/media/users/default.jpg';
    // this.roles = user.roles || [];
    // this.occupation = user.occupation || '';
    // this.companyName = user.companyName || '';
    this.phone = user.phone || '';
    // this.address = user.address;
    // this.socialNetworks = user.socialNetworks;
  }
}
