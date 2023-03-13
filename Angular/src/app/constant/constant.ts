export const SupportLanguages = [
    {
        name: 'English',
        locale: 'en',
        status: 1,
        id: 1,
        flag: './assets/media/svg/flags/226-united-states.svg'
    },
    {
        name: 'German',
        locale: 'de',
        status: 1,
        id: 2,
        flag: './assets/media/svg/flags/162-germany.svg'
    },
    {
        name: 'Italian',
        locale: 'it',
        status: 1,
        id: 3,
        flag: './assets/media/svg/flags/013-italy.svg'
    }
];

export const moduleList = [
    {
        name: 'MODULES_NAME.TEMPLATEANDREPORT',
        slug: "1"
    },
    // {
    //     name: 'MODULES_NAME.TEMPLATEANDREPORTGEN',
    //     slug: "2"
    // },
    {
        name: 'MODULES_NAME.MAPPING',
        slug: "3",
    },
    {
        name: 'MODULES_NAME.CLIENT_SETTING',
        slug: "4",
    },
    {
        name: 'MODULES_NAME.INFO_SUPPORT',
        slug: "5"
    }
];

export const projectName = 'DEV IT';

export const API_ROUTES = {
    LANGUAGE: 'language',
    USER: 'user',
    ROLE: 'role',
    MODULE: 'module',
    RIGHTS: 'rights',
    ADVANTAGES: 'advantages',
    TEMPLATETYPE: 'templatetype',
    TEMPLATE: 'template',
    MAPPING: 'mapping',
    SOCIAL_MEDIA: 'socialmedia',
    INFOMANAGMENT: 'infoManagment',
    FAQ: 'faq',
    MENU: 'menu',
    CMS: 'cms',
    PRICE: 'Price',
    FEATURES: 'Features',
    GEOLOCATION: 'geolocation',
    BUCKETS: 'buckets',
    SETTING: 'setting',
    SETTINGTYPE: 'setting-type',
    EDITOR: 'editor',
    EMAILTEMPLATE: 'emailTemplate',
    PORTAL: 'portals',
    CLIENT:'client'
};

export const validationLength = {
    nameMinLength: 1,
    nameMaxLength: 50,
    addressMaxLength: 250,
    phone_numberMaxLength: 10,
    postal_codeMaxLength: 6,
    clientamount_Maxlength: 100,
};

export const MODULES_NAME = {
    MENU: 'menu',
    USER: 'user',
    ROLE: 'role',
    MODULE: 'module',
    CMS: 'cms',
    RIGHTS: 'rights',
    PRICE: 'price',
    BUCKETS: 'buckets',
    BUCKETS_DATA: 'buckets',
    FEATURES: 'features',
    GEOLOCATION: 'geolocation',
    ADVANTAGES: 'advantages',
    TEMPLATE: 'template',
    TEMPLATETYPE: 'templatetype',
    MAPPING: 'mapping',
    SOCIAL_MEDIA: 'socialmedia',
    INFOMANAGMENT: 'infoManagment',
    FAQ: 'faq',
    SETTING: 'setting',
    SETTINGTYPE: 'setting-type',
    EDITOR: 'editor',
    PORTAL: 'portals',
    CLIENT:"client",
    PROJECT:"project"
};

export const USER_ENTITY = {
    COMPANY_ID: 'id',
    COMPANY_NAME: 'company_name',
    USER_NAME: 'user_name',
    EMAIL: 'email',
    SUBSCRIPTION: 'role_name',
    VALID_UNTIL: 'valid_until',
    PAYED: 'payed',
    LICENSE_KEY: 'license_key',
    STATUS: 'status',
    ACTION: 'actions'
};

export const TEMPLATE_TYPE_ENTITY = {
    NAME: 'name',
    PRIORITY: 'priority',
    COLUMN : 'column',
    ICON: 'image',
    STATUS: 'status',
    ACTION: 'actions'
};
export const ADVANTAGES_ENTITY = {
    NAME: 'name',
    PRIORITY: 'priority',
    COLUMN : 'column',
    ICON: 'image',
    FILE_NAME: 'image',
    STATUS: 'status',
    ACTION: 'actions'
};

export const TEMPLATE_ENTITY = {
    NAME: 'name',
    ICON: 'image',
    STATUS: 'status',
    ACTION: 'actions',
    FILE_NAME: 'image',
    CREATED_AT: 'created_at',
    TEMPLATE_TYPE: 'template_type'
};

export const MAPPING_ENTITY = {
    NAME: 'name',
    ICON: 'image',
    STATUS: 'status',
    UNIQUE: 'unique',
    ACTION: 'actions',
    FILE_NAME: 'file_name',
    TEMPLATE_TYPE: 'template_type',
    MAPPING_TYPE : 'mapping_type'
};

export const SOCIAL_MEDIA = {
    NAME: 'name',
    ICON: 'icon',
    STATUS: 'status',
    ACTION: 'actions',
    FILE_NAME: 'file_name',
    SOCIAL_MEDIA: 'socialmedia'
};


export const FAQ = {
    NAME: 'name',
    ICON: 'icon',
    STATUS: 'status',
    ACTION: 'actions',
    FILE_NAME: 'file_name',
    FAQ: 'faq',
    QUESTION: 'question'
};


export const INFOMANAGMENT = {
    NAME: 'name',
    TITLE: 'title',
    ICON: 'icon',
    STATUS: 'status',
    ACTION: 'actions',
    FILE_NAME: 'file_name',
    INFOMANAGMENT: 'infoManagment'
};

