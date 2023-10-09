enum ROLE_ADMIN {
    Manager,
    ConflictManager,
    registrationManager
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

export { ROLE_ADMIN, ORDER, ACTION, TYPE_CONTENT }