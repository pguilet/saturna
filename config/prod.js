module.exports = {
     //export following property and make it available in other files
     redirectDomain: process.env.REDIRECT_DOMAIN,
     sendGridKey: process.env.SEND_GRID_KEY,
     stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
     stripeSecretKey: process.env.STRIPE_SECRET_KEY,
     googleClientID: process.env.GOOGLE_CLIENT_ID,
     googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
     mongoURI: process.env.MONGO_URI,
     cookieKey: process.env.COOKIE_KEY, //we don't care the key. should not have a meaning for security reason
     awsBucketName: process.env.AWS_BUCKET_NAME,
     awsBucketRegion: process.env.AWS_BUCKET_REGION,
     awsAccessKey: process.env.AWS_ACCESS_KEY,
     awsSecretKey: process.env.AWS_SECRET_KEY,
     emailToSend: process.env.EMAIL_TO_SEND,
     mandataireName: process.env.MANDATAIRE_NAME,
     mandataireAddress: process.env.MANDATAIRE_ADDRESS,
};
