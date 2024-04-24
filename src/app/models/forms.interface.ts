export interface IAuditTrail {
  entry_description: string;
  entry_type: string;
  entry_date_time: string;
  entry_by_user_name: string;
  entry_by_user_category: string;
  type: string;
}

export interface ISimpleform {
  serial_no: number;
  name: string;
  datetime: string;
  date: string;
  gender: string;
  qualification: string;
  audit_trail: IAuditTrail;
}

export interface IAddressform {
  serial_no: number;
  country: string;
  state_province: string;
  city_district_county: string;
  address_line_one: string;
  address_line_two: string;
  postal_code: string;
  mobile_number: string;
  audit_trail: IAuditTrail;
}

export interface IStepperForm {
  serial_no?: number;
  name: string;
  date_time: string;
  time: any;
  date: string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  qualification: string;
  gender: string;
  nationality: string;
  audit_trail?: IAuditTrail;
}
