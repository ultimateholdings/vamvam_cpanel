enum USER_ROLE {
  manager = "admin",
  conflictManager = "conflict",
  registrationManager = "registration",
}

enum STORAGE_KEY {
  token = "token",
  role = "role",
  lang = "i18nextLng",
  theme = "theme",
}

enum DELIVERY_STATUS {
    "archived" = "archived",
    "cancelled" = "cancelled",
    "conflicting" = "inConflict",
    "pending-driver-approval" = "initial",
    "pending-driver-reception" = "pending reception",
    "started" = "started",
    "terminated" = "terminated",
    "pending-client-approval" = "pending confirmation"
}

export { DELIVERY_STATUS, USER_ROLE, STORAGE_KEY };
