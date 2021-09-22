const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');

class Mailer {
     constructor(config, content) {
          this.message = {
               to: config.to,
               from: config.from,
               subject: config.subject,
               html: content,
               trackingSettings: {
                    clickTracking: { enable: true },
               },
          };
          sgMail.setApiKey(keys.sendGridKey);
     }

     async send() {
          const response = await sgMail.sendMultiple(this.message);
          return response;
     }
}

module.exports = Mailer;
