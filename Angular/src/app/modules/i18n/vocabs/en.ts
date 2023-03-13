import { projectName } from '../../../constant/constant';
// USA

const projectname = projectName;

export const locale = {
  lang: 'en',
  data: {
    TRANSLATOR: {
      SELECT: 'Select your language',
    },
    MENU: {
      NEW: 'new',
      ACTIONS: 'Actions',
      CREATE_POST: 'Create New Post',
      PAGES: 'Pages',
      FEATURES: 'Features',
      APPS: 'Apps',
      DASHBOARD: 'Dashboard',
    },
    AUTH: {
      GENERAL: {
        OR: 'Or',
        SUBMIT_BUTTON: 'Submit',
        SET_PASSWORD:"Set Password",
        NO_ACCOUNT: 'Don\'t have an account?',
        SIGNUP_BUTTON: 'Sign Up',
        FORGOT_BUTTON: 'Forgot Password',
        BACK_BUTTON: 'Back',
        PRIVACY: 'Privacy',
        LEGAL: 'Legal',
        CONTACT: 'Contact',
      },
      LOGIN: {
        HEADING: 'Welcome to Sync-n-Scale',
        TITLE: 'Login Account',
        BUTTON: 'Login',
      },
      FORGOT: {
        TITLE: 'Forgot Password ?',
        DESC: 'Enter your email to reset your password',
        SUCCESS: 'Your account has been successfully reset.',
        FORGOT_TITLE: projectname + ' | Forgot Password',
      },
      REGISTER: {
        TITLE: 'Sign Up',
        DESC: 'Enter your details to create your account',
        SUCCESS: 'Your account has been successfuly registered.'
      },
      INPUT: {
        EMAIL: 'Email',
        FULLNAME: 'Fullname',
        PASSWORD: 'Password',
        CONFIRM_PASSWORD: 'Confirm Password',
        USERNAME: 'Username'
      },
      VALIDATION: {
        INVALID: '{{name}} is not valid',
        REQUIRED: '{{name}} is required',
        MIN_LENGTH: '{{name}} minimum length is {{min}}',
        AGREEMENT_REQUIRED: 'Accepting terms & conditions are required',
        NOT_FOUND: 'The requested {{name}} is not found',
        INVALID_LOGIN: 'The login detail is incorrect',
        REQUIRED_FIELD: 'Required field',
        MIN_LENGTH_FIELD: 'Minimum field length:',
        MAX_LENGTH_FIELD: 'Maximum field length:',
        INVALID_FIELD: 'Field is not valid',
        CURRENTPASS: 'Enter valid password',
        INVALID_PASSWORD: 'Contains 8-15 characters, at least one number, at least one upper character, at least one lower character, at least one special character.',
        MATCH_PASSWORD:"Password and confirmPassword didn't match",
        INVALID_PHONE: "Contact should be 10 digits",
        INVALID_EMAIL: "Email should be valid",
        EMAIL_PATTERN:"Please enter proper email",
        PHONE_PATTERN:"Please enter valid phone number"
        
      }
    },
    ECOMMERCE: {
      COMMON: {
        SELECTED_RECORDS_COUNT: 'Selected records count: ',
        ALL: 'All',
        SUSPENDED: 'Suspended',
        ACTIVE: 'Active',
        YES: 'Yes',
        FILTER: 'Filter',
        BY_STATUS: 'by Status',
        BY_TYPE: 'by Type',
        BUSINESS: 'Business',
        INDIVIDUAL: 'Individual',
        SEARCH: 'Search',
        IN_ALL_FIELDS: 'in all fields'
      },
      ECOMMERCE: 'eCommerce',
      CUSTOMERS: {
        CUSTOMERS: 'Customers',
        CUSTOMERS_LIST: 'Customers list',
        NEW_CUSTOMER: 'New Customer',
        DELETE_CUSTOMER_SIMPLE: {
          TITLE: 'Customer Delete',
          DESCRIPTION: 'Are you sure to permanently delete this customer?',
          WAIT_DESCRIPTION: 'Customer is deleting...',
          MESSAGE: 'Customer has been deleted'
        },
        DELETE_CUSTOMER_MULTY: {
          TITLE: 'Customers Delete',
          DESCRIPTION: 'Are you sure to permanently delete selected customers?',
          WAIT_DESCRIPTION: 'Customers are deleting...',
          MESSAGE: 'Selected customers have been deleted'
        },
        UPDATE_STATUS: {
          TITLE: 'Status has been updated for selected customers',
          MESSAGE: 'Selected customers status have successfully been updated'
        },
        EDIT: {
          UPDATE_MESSAGE: 'Customer has been updated',
          ADD_MESSAGE: 'Customer has been created'
        }
      }
    },
    BUTTONS: {
      SUBMIT: 'Submit',
      CANCEL: 'Cancel',
      SAVE: 'Save',
      RESET: 'Reset',
      UPDATE: 'Update',
      UPDATEANDRETURN: 'Update & Return',
      DELETE: 'Delete',
      DELETE_ALL: 'Delete All',
      UPDATE_STATUS: 'Update Status',
      SEARCH: 'Search'
    },
    MODULES_NAME: {
      TEMPLATE_REPOERTS: 'Templates & Reports',
      TEMPLATEANDREPORT: 'Template Creator',
      TEMPLATEANDREPORTGEN: 'Report Generator',
      MAPPING: 'Mapping',
      CLIENT_SETTING: 'Client Settings',
      INFO_SUPPORT: 'Info & Support'
    },
    PAGES: {
      ROLE: {
        PERMISSION: 'Permissions',
        ROLE_LIST: 'Role List',
        ADD: 'Add Role',
        UPDATE: 'Update Role',
        ROLE: 'Role',
        ADD_TITLE: projectname + ' | New Role',
        EDIT_TITLE: projectname + ' | Edit Role',
        LIST_TITLE: projectName + ' | Role List',
        ADD_NEW_ROLE: 'Add New Role',
        INPUT: {
          NAME: 'Name'
        }
      },
      CLIENT: {
        PERMISSION: 'Permissions',
        CLIENT_LIST: 'Client Group',
        ADD: 'Add client',
        UPDATE: 'Update Client Entry',
        CLIENT: 'client',
        ADD_TITLE: projectname + ' | New Client',
        EDIT_TITLE: projectname + ' | Edit Client',
        LIST_TITLE: projectName + ' | Client List',
        ADD_NEW_CLIENT: 'New Client Entry',
        INPUT: {
          NAME: 'Name'
        }
      },
      PROJECT: {
        PERMISSION: 'Permissions',
        PROJECTT_LIST: 'Project List',
        ADD: 'Create Project',
        UPDATE: 'Update Project',
        PROJECT: 'Project',
        ADD_TITLE: projectname + ' | New Project',
        EDIT_TITLE: projectname + ' | Edit Project',
        LIST_TITLE: projectName + ' | Project List',
        ADD_NEW_ROLE: 'Add New Project',
      },
      ASSIGNPROJECT: {
        ASSIGNPROJECT_LIST: 'Assign project list',
        ADD: 'Add assign project',
        UPDATE: 'Update Assign Project',
        ASSIGNPROJECT: 'Assign Project',
        ADD_TITLE: projectname + ' | New Assign Project',
        EDIT_TITLE: projectname + ' | Edit Assign Project',
        LIST_TITLE: projectName + ' | Assign Project List',
        ADD_NEW_ROLE: 'Add New Assign Project',
        INPUT: {
          NAME: 'Name'
        }
      },
      MODULE: {
        MODULE_LIST: 'Module List',
        ADD: 'Add Module',
        UPDATE: 'Update Module',
        MODULE: 'Module',
        ADD_TITLE: projectname + ' | New Module',
        EDIT_TITLE: projectname + ' | Edit Module',
        LIST_TITLE: projectName + ' | Module List',
        ADD_NEW_MODULE: 'Add New Module',
        INPUT: {
          NAME: 'Name',
          DESCRIPTION: 'Description',
          PORTAL: 'Portal',
        }
      },
      RIGHTS: {
        RIGHTS_LIST: 'Rights List',
        ADD: 'Add Rights',
        UPDATE: 'Update Rights',
        RIGHTS: 'Rights',
        ADD_TITLE: projectname + ' | New Rights',
        EDIT_TITLE: projectname + ' | Edit Rights',
        LIST_TITLE: projectName + ' | Rights List',
        ADD_NEW_RIGHTS: 'Add New Rights',
        INPUT: {
          NAME: 'Name'
        }
      },
      PORTAL: {
        PORTAL_LIST: 'Portal List',
        ADD: 'Add Portal',
        UPDATE: 'Update Portal',
        MODULE: 'Portal',
        ADD_TITLE: projectname + ' | New Portal',
        EDIT_TITLE: projectname + ' | Edit Portal',
        LIST_TITLE: projectName + ' | Portal List',
        ADD_NEW_MODULE: 'Add New Portal',
        MAINTENANCE: 'Maintenance',
        INPUT: {
          NAME: 'Name',
          URL : 'URL',
          OWNER: 'Owner',
        }
      },
      ADVANTAGES: {
        ADVANTAGES_LIST: 'Advantages List',
        ADD: 'Add Advantage',
        UPDATE: 'Update Advantage',
        ADVANTAGES: 'Advantages',
        ADD_TITLE: projectname + ' | New Advantages',
        EDIT_TITLE: projectname + ' | Edit Advantages',
        LIST_TITLE: projectName + ' | Advantages List',
        ADD_NEW_ADVANTAGES: 'Add New Advantages',
        INPUT: {
          NAME: 'Name',
          DESCRIPTION: 'Description',
        }
      },
      MENU: {
        MENU_LIST: 'Menu List',
        ADD: 'Add Menu',
        UPDATE: 'Update Menu',
        MENU: 'Menu',
        ADD_TITLE: projectname + ' | New Menu',
        EDIT_TITLE: projectname + ' | Edit Menu',
        LIST_TITLE: projectName + ' | Menu List',
        ADD_NEW_MENU: 'Add New Menu',
        INPUT: {
          NAME: 'Name',
          TITLE: 'Title',
          DESCRIPTION: 'Description',
          MODULE: 'Module',
          PARENT: 'Parent',
          URL: 'URL',
          ICON: 'Icon',
          LOCATION: 'Location',
          MENUTYPE: 'Menu Type',
          ORDER: 'Order',
        }
      },
      CMS: {
        CMS_LIST: 'CMS List',
        ADD: 'Add CMS',
        UPDATE: 'Update CMS',
        CMS: 'CMS',
        ADD_TITLE: projectname + ' | New CMS',
        EDIT_TITLE: projectname + ' | Edit CMS',
        LIST_TITLE: projectName + ' | CMS List',
        ADD_NEW_CMS: 'Add New CMS',
        PAGE_BUILDER: 'Page Builder',
        VIEW: 'Page View',
        INPUT: {
          NAME: 'Name',
          TITLE: 'Title',
          SHORTDESCRIPTION: 'Short Description',
          METATITLE: 'Meta Title',
          METADESCRIPTION: 'Meta Description',
          METAKEYWORD:  'Meta Keyword',
          DESCRIPTION: 'Description',
          STATE: 'State'
        }
      },
      EMAILTEMPLATE: {
        EMAILTEMPLATE_LIST: 'Email Template List',
        ADD: 'Add Email Template ',
        UPDATE: 'Update Email Template ',
        EMAILTEMPLATE: 'Email Template ',
        ADD_TITLE: projectname + ' | New Email Template ',
        EDIT_TITLE: projectname + ' | Edit Email Template ',
        LIST_TITLE: projectName + ' | Email Template  List',
        ADD_NEW_EMAILTEMPLATE: 'Add New Email Template ',
        INPUT: {
          NAME: 'Name',
          TITLE: 'Title',
          SHORTDESCRIPTION: 'Short Description',
          METATITLE: 'Meta Title',
          METADESCRIPTION: 'Meta Description',
          METAKEYWORD:  'Meta Keyword',
          DESCRIPTION: 'Description',
          STATE: 'State',
          SUBJECT : 'Subject',
          FORMATE : 'Formate'
        }
      },
      EDITOR: {
        EDITOR_LIST: 'Page List',
        ADD: 'Add Page',
        UPDATE: 'Update Page',
        EDITOR: 'Page',
        ADD_TITLE: projectname + ' | New Page',
        EDIT_TITLE: projectname + ' | Edit Page',
        LIST_TITLE: projectName + ' | Page List',
        ADD_NEW_EDITOR: 'Add New Page',
        INPUT: {
          NAME: 'Name',
          TITLE: 'Title',
          SHORTDESCRIPTION: 'Short Description',
          METATITLE: 'Meta Title',
          METADESCRIPTION: 'Meta Description',
          METAKEYWORD:  'Meta Keyword',
          STATE: 'State',
        }
      },
      FEATURES: {
        FEATURES_LIST: 'Features List',
        ADD: 'Add Features',
        UPDATE: 'Update Features',
        FEATURES: 'Features',
        ADD_TITLE: projectname + ' | New Features',
        EDIT_TITLE: projectname + ' | Edit Features',
        LIST_TITLE: projectName + ' | Features List',
        ADD_NEW_FEATURES: 'Add New Features',
        INPUT: {
          NAME: 'Name',
          TITLE: 'Title',
          PRICE: 'Price',
          UNITS: 'Units',
          PERIODS: 'Duration',
          METADESCRIPTION: 'Meta Description',
          METAKEYWORD:  'Meta Keyword',
          DESCRIPTION: 'Description',
          STATE: 'Page State',
        }
      },
      GEOLOCATION: {
        GEOLOCATION_LIST: 'Geolocation List',
        ADD: 'Add Geolocation',
        UPDATE: 'Update Geolocation',
        GEOLOCATION: 'Geolocation',
        ADD_TITLE: projectname + ' | New Geolocation',
        EDIT_TITLE: projectname + ' | Edit Geolocation',
        LIST_TITLE: projectName + ' | Geolocation List',
        ADD_NEW_GEOLOCATION: 'Add New Geolocation',
        INPUT: {
          NAME: 'Region',
          TITLE: 'Title',
          PRICE: 'Price',
          UNITS: 'Units',
          PERIODS: 'Duration',
          COUNTRY: 'Country',
          METADESCRIPTION: 'Meta Description',
          METAKEYWORD:  'Meta Keyword',
          DESCRIPTION: 'Description',
          STATE: 'Page State',
          LONGITUDE: 'Longitude',
          LATITUDE: 'Latitude',
        }
      },
      PRICE: {
        PRICE_LIST: 'Plan List',
        ADD: 'Add Plan',
        UPDATE: 'Update Plan',
        PRICE: 'Plan',
        ADD_TITLE: projectname + ' | New Plan',
        EDIT_TITLE: projectname + ' | Edit Plan',
        LIST_TITLE: projectName + ' | Plan List',
        ADD_NEW_PRICE: 'Add New Plan',
        INPUT: {
          NAME: 'Name',
          TITLE: 'Title',
          METATITLE: 'Meta Title',
          METADESCRIPTION: 'Meta Description',
          METAKEYWORD:  'Meta Keyword',
          DESCRIPTION: 'Description',
          STATE: 'Page State',
          FEATURES: 'Features',
          DISPLAYNAME: 'Display Name'
        }
      },
      BUCKETS: {
        BUCKETS_LIST: 'Buckets List',
        ADD: 'Add Buckets',
        UPDATE: 'Update Buckets',
        BUCKETS: 'Buckets',
        ADD_TITLE: projectname + ' | New Buckets',
        EDIT_TITLE: projectname + ' | Edit Buckets',
        LIST_TITLE: projectName + ' | Buckets List',
        ADD_NEW_BUCKETS: 'Add New Buckets',
        INPUT: {
          NAME: 'Buckets Name',
          TITLE: 'Buckets Title',
          METATITLE: 'Buckets Meta Title',
          METADESCRIPTION: 'Buckets Meta Description',
          METAKEYWORD:  'Buckets Meta Keyword',
          DESCRIPTION: 'Buckets Description',
          STATE: 'Buckets Page State',
        }
      },
      SETTING: {
        SETTING_LIST: 'Setting List',
        ADD: 'Add Setting',
        UPDATE: 'Update Setting',
        SETTING: 'Setting',
        ADD_TITLE: projectname + ' | New Setting',
        EDIT_TITLE: projectname + ' | Edit Setting',
        LIST_TITLE: projectName + ' | setting List',
        ADD_NEW_SETTING: 'Add New Setting',
        INPUT: {
          NAME: 'Name',
          VALUE: 'Value',
          SETTINGTYPEID: 'Setting Type Id'
        }
      },
      SETTINGTYPE: {
        SETTINGTYPE_LIST: 'Setting Type List',
        ADD: 'Add Setting Type',
        UPDATE: 'Update Setting Type',
        SETTINGTYPE: 'Setting Type',
        ADD_TITLE: projectname + ' | New Setting Type',
        EDIT_TITLE: projectname + ' | Edit Setting Type',
        LIST_TITLE: projectName + ' | Setting Type List',
        ADD_NEW_SETTINGTYPE: 'Add New Setting Type',
        INPUT: {
          NAME: 'Name'
        }
      },
      COMMON: {
        SELECTED_RECORDS_COUNT: 'Selected records count: ',
        STATUS: 'Status',
        ACTIVE: 'Active',
        INACTIVE: 'Inactive',
        MAINTENANCE: 'Maintenance',
        YES: 'Yes',
        NO: 'No',
        ALL: 'All',
        USERLIST: 'Company List',
        SLOGEN: 'Who wants to fly. needs wings',
        TOKENEXPIRE: 'Token Expire',
      },
      USER: {
        USER_LIST: 'User List',
        ADD: 'Add User',
        UPDATE: 'Update User',
        USER: 'User',
        USER_MGMT: 'User Management',
        PROFILE: 'User Profile',
        USERIMPORT: 'User Import',
        ADD_TITLE: projectname + ' | New User',
        EDIT_TITLE: projectname + ' | Edit User',
        LIST_TITLE: projectName + ' | User List'
      },
      TEMPLATE: {
        TEMPLATE_LIST: 'Template List',
        ADD: 'Add Template',
        UPDATE: 'Update Template',
        TEMPLATE: 'Template',
        TEMP_MGMT: 'Template Management',
        ADD_TITLE: projectname + ' | New Template',
        EDIT_TITLE: projectname + ' | Edit Template',
        LIST_TITLE: projectName + ' | Template List'
      },
      TEMPLATE_TYPE: {
        TEMPLATE_TYPE_LIST: 'Template Type List',
        ADD: 'Add Template Type',
        UPDATE: 'Update Template Type',
        TEMPLATE_TYPE: 'Template Type',
        TEMP_MGMT: 'Template Type Management',
        ADD_TITLE: projectname + ' | New Template Type',
        EDIT_TITLE: projectname + ' | Edit Template Type',
        LIST_TITLE: projectName + ' | Template Type List'
      },
      USER_PROFILE: {
        PROFILE: 'User Profile',
        ADD: 'Add Template Type',
        UPDATE: 'Update Template Type',
        TEMPLATE_TYPE: 'Template Type',
        TEMP_MGMT: 'Template Type Management',
        ADD_TITLE: projectname + ' | New Template Type',
        EDIT_TITLE: projectname + ' | Edit Template Type',
        LIST_TITLE: projectName + ' | Template Type List'
      },
      MAPPING: {
        TEMPLATE_LIST: 'Mapping List',
        ADD: 'Add Mapping',
        UPDATE: 'Update Mapping',
        MAPPING: 'Mapping',
        MAP_MGMT: 'Mapping Management',
        ADD_TITLE: projectname + ' | New Mapping',
        EDIT_TITLE: projectname + ' | Edit Mapping',
        LIST_TITLE: projectName + ' | Mapping List'
      },
      SOCIAL_MEDIA: {
        SOCIAL_MEDIA_LIST: 'Social Media List',
        ADD: 'Add Social Media',
        UPDATE: 'Update Social Media',
        SOCIAL_MEDIA: 'Social Media',
        MAP_MGMT: 'Social Media Management',
        ADD_TITLE: projectname + ' | New Social Media',
        EDIT_TITLE: projectname + ' | Edit Social Media',
        LIST_TITLE: projectName + ' | Social Media List'
      },
      INFOMANAGMENT: {
        INFOMANAGMENT_LIST: 'Info Managment List',
        ADD: 'Add Info Managment',
        UPDATE: 'Update Info Managment',
        INFOMANAGMENT: 'Info Managment',
        MAP_MGMT: 'Info Managment Management',
        ADD_TITLE: projectname + ' | New Info Managment',
        EDIT_TITLE: projectname + ' | Edit Info Managment',
        LIST_TITLE: projectName + ' | Info Managment List'
      },
      FAQ: {
        FAQ_LIST: 'FAQ List',
        ADD: 'Add FAQ',
        UPDATE: 'Update FAQ',
        FAQ: 'FAQ',
        MAP_MGMT: 'FAQ Management',
        ADD_TITLE: projectname + ' | New FAQ',
        EDIT_TITLE: projectname + ' | Edit FAQ',
        LIST_TITLE: projectName + ' | FAQ List'
      },
    }
  }
};

