import mongoose from 'mongoose';

const BillingSchema = new mongoose.Schema({
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,    // ⬅️ This is what causes the error when missing
  },
  caseId: {
    type: String,
    required: true,
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  },
  charge: {
    type: Number,
    default: 10,
  },
});


export default mongoose.models.Billing || mongoose.model('Billing', BillingSchema);
