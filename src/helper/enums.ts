enum USER_ROLE {
  manager = "admin",
  conflictManager = "conflict-manager",
  registrationManager = "registration-manager",
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
  "pending-client-approval" = "pending confirmation",
}

const DELIVERY_SCHEME  = {
    "archived": "default",
    "conflicting": "red",
    "cancelled": "teal",
    "pending-driver-approval": "linkedin",
    "pending-driver-reception": "facebook",
    "pending-client-approval": "twitter",
    "started": "telegram",
    "terminated": "green",
};
enum RequestResult {
    error = "error in request",
    pending = "pending request",
    resolved = "request resolved",
    initial = "not requested"
}
export { DELIVERY_SCHEME, DELIVERY_STATUS, USER_ROLE, STORAGE_KEY, RequestResult };


