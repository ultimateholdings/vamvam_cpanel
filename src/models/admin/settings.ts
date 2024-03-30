interface OTPSettingsData {
  type: string;
  value: OTPSettingsValue;
}

interface OTPSettingsValue {
  ttl: number;
}

interface DeliverySettingsData {
  type: string;
  value: DeliverySettingsValue;
}

interface DeliverySettingsValue {
  ttl: number;
  search_radius: number;
  conflict_types: TypeItem[];
  package_types: TypeItem[];
}

interface TypeItem {
  code: string;
  en: string;
  fr: string;
}

export type {
  OTPSettingsData,
  TypeItem,
  DeliverySettingsData,
  OTPSettingsValue,
  DeliverySettingsValue,
};
