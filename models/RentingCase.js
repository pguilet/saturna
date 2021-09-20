const mongoose = require('mongoose');
const { Schema } = mongoose; //equivalent to const Schema =  mongoose.Schema;

const rentingCaseSchema = new Schema({
     rentingPrice: Number,
     rentingCharges: Number,
     notPayed: String,
     notPayedComment: String,
     caution: Number,
     cautionType: String,
     ownerInsurrance: String,
     renterInsurrance: String,
     floor: Number,
     door: String,
     street: String,
     caseClosed: { type: Boolean, default: false },
     bail: String,
     entryForm: String,
     exitForm: String,
     inProgressProcedure: String,
     reclamation: String,
     paymentKind: String,
     postalCode: Number,
     rib: String,
     city: String,
     comment: String,
     rentReceipts: [String],
     lastEntryFormImages: [String],
     _user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('rentingCases', rentingCaseSchema); //don't do anything if collection already exists if the same.
