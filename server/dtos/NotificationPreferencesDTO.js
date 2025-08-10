// dtos/NotificationPreferencesDTO.js

class NotificationPreferencesOutputDTO {
  constructor(prefs) {
    this.email_updates = prefs.email_updates;
    this.sms_alerts = prefs.sms_alerts;
    this.browser_push = prefs.browser_push;
    this.promotional_content = prefs.promotional_content;
    this.app_progress_updates = prefs.app_progress_updates;
    this.fee_payment_notifications = prefs.fee_payment_notifications;
    this.maintenance_alerts = prefs.maintenance_alerts;
    this.weekly_summary_email = prefs.weekly_summary_email;
  }
}

class NotificationPreferencesInputDTO {
  constructor({
    email_updates,
    sms_alerts,
    browser_push,
    promotional_content,
    app_progress_updates,
    fee_payment_notifications,
    maintenance_alerts,
    weekly_summary_email,
  }) {
    this.email_updates = email_updates;
    this.sms_alerts = sms_alerts;
    this.browser_push = browser_push;
    this.promotional_content = promotional_content;
    this.app_progress_updates = app_progress_updates;
    this.fee_payment_notifications = fee_payment_notifications;
    this.maintenance_alerts = maintenance_alerts;
    this.weekly_summary_email = weekly_summary_email;
  }
}

module.exports = { NotificationPreferencesOutputDTO, NotificationPreferencesInputDTO };
