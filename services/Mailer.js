// const sendgrid = require('sendgrid');
// const helper= sendgrid.mail;
const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');

class Mailer {
     constructor({ subject, recipients }, content) {
          this.message = {
               to: recipients,
               from: 'pierre.guilet@gmail.com',
               subject: subject,
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

// class Mailer extends helper.Mail{
//     constructor({subject, recipients},content){
//         super();
//         debugger;
//         this.sgApi=sendgrid(keys.sendGridKey);
//         this.from_email = new helper.Email('pierre.guilet@gmail.com');
//         this.subject=subject;
//         this.body = new helper.Content('text/html', content);
//         this.recipients=this.formatAddresses(recipients);

//         this.addContent(this.body);
//         this.addClickTracking();
//         this.addRecipients();
//     }

//     formatAddresses(recipients){
//         return recipients.map(({email})=>{
//             return new helper.Email(email);
//         });
//     }

//     addClickTracking(){
//         const trackingSettings =  new helper.TrackingSettings();
//         const clickTracking = new helper.ClickTracking(true, true);
//         trackingSettings.setClickTracking(clickTracking);
//         this.addTrackingSettings(trackingSettings);
//     }

//     addRecipients(){
//         const personalize= new helper.Personalization();
//         this.recipients.forEach(recipient=>{
//             personalize.addTo(recipient);
//         });
//         this.addPersonalization(personalize);
//     }

//     async send(){
//         const request = this.sgApi.emptyRequest({
//             method:'POST',
//             path:'/v3/mail/send',
//             body:this.toJSON()
//         });
//         const response = await this.sgApi.API(request);
//         return response;
//     }
// }

// module.export=Mailer;
