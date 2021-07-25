module.exports={//export following property and make it available in other files
    redirectDomain:process.env.REDIRECT_DOMAIN,
    sendGridKey:process.env.SEND_GRID_KEY,
    stripePublishableKey:process.env.STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    googleClientID:process.env.GOOGLE_CLIENT_ID,
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
    mongoURI:process.env.MONGO_URI,
    cookieKey:process.env.COOKIE_KEY//we don't care the key. should not have a meaning for security reason
};