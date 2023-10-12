enum ROLE_USER {
    Manager = 'Manager',
    ConflictManager = 'ConflictManager',
    RegistrationManager = 'RegistrationManager',
    Driver = 'Driver',
}

enum ORDER {
    ASC,
    DESC
}

enum ACTION {
    READ,
    EDIT,
    DELETE,
    DOWNLOAD,
}

enum TYPE_CONTENT {
    TEXT,
    IMAGE,
    PRICE,
    BADGE,
    SUBTITLE
}


enum GENDER {
    MALE = "M.",
    FEMALE = "Mme."
}

enum LANG {
    FR = "FR",
    EN = "EN"
}

export { ROLE_USER, ORDER, ACTION, TYPE_CONTENT, GENDER, LANG }