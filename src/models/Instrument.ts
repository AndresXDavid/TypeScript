import mongoose, { Document, Schema } from "mongoose";

export interface IInstrument extends Document {
     name: string;
     brand?: string;
     year?: number;
     type: mongoose.Types.ObjectId;
     details?: string;
}

const InstrumentSchema = new Schema<IInstrument>({
     name: { type: String, required: true },
     brand: { type: String },
     year: { type: Number },
     type: { type: Schema.Types.ObjectId, ref: "InstrumentType", required: true },
     details: { type: String }
}, { timestamps: true });

export default mongoose.model<IInstrument>("Instrument", InstrumentSchema);