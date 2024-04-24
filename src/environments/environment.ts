let baseURL: any = 'https://g23api.getster.tech/api/';
// let baseURL: any = 'http://localhost:3043/api/';
let base_URL:any = 'https://g20api.getster.tech/api/';
let baseURL2: any = 'https://g17api.getster.tech/api/';
let baseURL3: any = 'https://g18api.getster.tech/api/';
let baseURL4: any = 'https://g14api.getster.tech/api/';
let baseURL_API:any = `https://manageapi.getster.tech/api/`;
export const environment = {
  production: false,
  // baseURL: 'http://localhost:3000/api/',
  // baseURL: 'https://getsteradminapi.getbiz.app/api/',
  //login
  verify_getster_password: `${baseURL_API}manage-getster/login-with-getster-password`,
  get_assigned_getster_to_camps:`${base_URL}login/get-assigned-getster-to-camps`,
  get_camp_site_name_based_on_country_code:`${base_URL}login/get-camp-site-name-based-on-country-code`,
  get_getster_category_id_based_getster_id: `${base_URL}login/get-getster-category_id-based-getster-id`,
  //
  get_new_getster: `${baseURL}admin/getster/get-new-getster`,
  // get_console_getster: `${baseURL}admin/getster/get-console-getster`,
  get_getster_profile: `${baseURL}admin/getster/get-getster-profile`,
  get_existing_profile: `${baseURL}admin/getster/get-existing-getster`,
  get_manual_block_getster: `${baseURL}getster/admin/get-manual-block-getster`,
  update_getster_profile: `${baseURL}admin/getster/update-new-getster`,
  get_auto_blocked_getster: `${baseURL}getster/admin/get-auto-block-getster`,

  //getster Profile
  usereidentitycardeligibilitycard: `${baseURL}getster-profile/create_tables`,
  getcardbooleanvalues: `${baseURL}getster-profile/get-e-identity-card-values`,
  getsterprofiletreeview: `${baseURL}getster-profile/get-all-categories`,

  approveprofilechangesByUsers_table: `${baseURL}getster-profile/get-approve-getsters`,
  approveprofilechangesByUsers_table_delete: `${baseURL}getster-profile/delete-approve-getsters`,
  approveprofilechangesByUsers_table_update: `${baseURL}getster-profile/approve-profile-changes-by-users`,
  getster_profile_login_reset_table1_category_id: `${baseURL}getster-profile/get-getster-profile-login-reset-getster-category-name`,
  get_audit_trail: `${baseURL}admin/getster/get-audit-trail`,

  getster_profile_login_reset_table1: `${baseURL}getster-profile-login-reset/get-getster-profile-login-reset`,
  getster_profile_login_reset_table1_update_mobno: `${baseURL}getster-profile-login-reset/update-getsters-profile-login-reset-mobile`,
  getster_profile_login_reset_table1_update_pass: `${baseURL}getster-profile-login-reset/update-getsters-profile-login-reset-pass`,

  getster_profile_login_reset_table1_update: `${baseURL}getster-profile-login-reset/update-getsters-profile-login-reset`,
  getster_location_update: `${baseURL}getster-profile/getster-biz-location-update`,
  get_getster_category_wise_additional_fields: `${baseURL}getster-profile-login-reset/get-getster-category-wise-additional-fields`,
  get_approve_getster_category_wise_additional_fields: `${baseURL}getster-profile-login-reset/get-approve-getster-category-wise-additional-fields`,
  getster_complete_details: `${baseURL}getster-profile/get-gester-complete-details`,
  getster_card_boolean_values: `${baseURL}getster-profile/get-getster-e-identity-card-values`,
  get_getster_category: `${baseURL}getster-profile-login-reset/get-getster-category`,
  update_treeview_category_id: `${baseURL}getster-profile-login-reset/tree-category-id-update`,
  send_email_password: `${baseURL2}getster-reset-password/email`,
  send_sms_password: `${baseURL2}getster-reset-password/email/send-sms`,
  send_email_phone_number: `${baseURL3}reset-mobile-number/email`,
  send_sms_phone_number: `${baseURL3}reset-mobile-number/email/send-sms`,
  profile_card_url: `${baseURL4}getster-e-identity-card/getster-e-identity-card/get-profile-card-url`,
  on_encoded: `${baseURL4}getster-e-identity-card/getster-e-identity-card/on-decrypt-encoded`,
};
