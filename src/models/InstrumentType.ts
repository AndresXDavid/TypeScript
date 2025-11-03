import mongoose, { Document, Schema } from "mongoose";

export interface IInstrumentType extends Document {
     name: string;
     description?: string;
}

const InstrumentTypeSchema = new Schema<IInstrumentType>({
     name: { type: String, required: true },
     description: { type: String }
}, { timestamps: true });

export default mongoose.model<IInstrumentType>("InstrumentType", InstrumentTypeSchema);