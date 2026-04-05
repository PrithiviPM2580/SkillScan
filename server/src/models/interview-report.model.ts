import mongoose, { Schema, Document } from "mongoose";

interface IQuestion {
  question: string;
  intension: string;
  answer: string;
}

interface ISkillGap {
  skill: string;
  severity: "low" | "medium" | "high";
}

interface IPreparationPlan {
  day: number;
  focus: string;
  tasks: string[];
}

type ITechnicalQuestion = IQuestion;
type IBehavioralQuestion = IQuestion;

export interface IInterviewReport extends Document {
  user: mongoose.Types.ObjectId;
  jobDescription: string;
  resume?: string;
  selfDescription?: string;
  matchScore: number;
  technicalQuestions: ITechnicalQuestion[];
  behavioralQuestions: IBehavioralQuestion[];
  skillGaps: ISkillGap[];
  preparationPlan: IPreparationPlan[];
}

const technicalQuestionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true },
    intension: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false },
);

const behavioralQuestionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true },
    intension: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false },
);

const skillGapSchema = new Schema<ISkillGap>(
  {
    skill: { type: String, required: true },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
  },
  { _id: false },
);

const preparationPlanSchema = new Schema<IPreparationPlan>(
  {
    day: { type: Number, required: true },
    focus: { type: String, required: true },
    tasks: [{ type: String, required: true }],
  },
  { _id: false },
);

const interviewReportSchema = new Schema<IInterviewReport>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jobDescription: { type: String, required: true },
    resume: { type: String },
    selfDescription: { type: String },
    matchScore: { type: Number, required: true },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
  },
  {
    timestamps: true,
  },
);

const InterviewReport = mongoose.model<IInterviewReport>(
  "InterviewReport",
  interviewReportSchema,
);

export default InterviewReport;
