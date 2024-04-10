interface GetRegistrationArgs {
  name?: string;
  pageToken?: string;
  skip?: number;
  from?: string;
  to?: string;
  status?: "pending" | "validated" | "rejected" | undefined;
}

export type { GetRegistrationArgs };
