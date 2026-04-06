import {
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Clock3,
  FileText,
  Sparkles,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import useInterview from "@/features/interview/hooks/useInterview";
import { useNavigate } from "react-router-dom";
import { SpinnerCustom } from "./ui/spinner";

const jobHighlights = [
  "Tailor interview prep to the exact role",
  "Surface the most relevant skill gaps fast",
  "Turn a resume or self-summary into a strategy",
];

const profileSteps = [
  "Upload a resume or add a short bio",
  "Detect strengths, gaps, and interview angles",
  "Generate a focused prep plan with priorities",
];

const HomePage = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const { loading, createReport } = useInterview();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    if (!resumeFile) {
      return;
    }

    const data = await createReport({
      resume: resumeFile,
      jobDescription,
      selfDescription,
    });

    const interviewId = data?.data?.interview?._id;

    if (!interviewId) {
      return;
    }

    navigate(`/interview/${interviewId}`);
  };

  if (loading) {
    return <SpinnerCustom />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at top left, rgba(37, 99, 235, 0.14), transparent 34%), radial-gradient(circle at top right, rgba(96, 165, 250, 0.16), transparent 30%), linear-gradient(180deg, rgba(248, 250, 252, 0.98), rgba(255, 255, 255, 1))",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.12),transparent)] blur-3xl" />
      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative w-full">
          <div className="mx-auto mb-8 max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-medium tracking-[0.24em] text-primary uppercase shadow-sm">
              <Sparkles className="size-4" />
              AI Interview Planner
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Create Your Custom{" "}
              <span className="text-primary">Interview Plan</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Let the system analyze your target role and profile, then build a
              sharper prep strategy around the skills, stories, and gaps that
              matter most.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_0.95fr]">
            <Card className="border-slate-200/80 bg-white/95 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
              <CardHeader className="border-b border-slate-200/70 pb-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-950">
                      <FileText className="size-4 text-primary" />
                      Target Job Description
                    </CardTitle>
                    <CardDescription className="mt-1 text-slate-600">
                      Paste the role you want to prepare for. The more specific,
                      the better the strategy.
                    </CardDescription>
                  </div>
                  <span className="rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
                    Required
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-6">
                <Textarea
                  placeholder="Paste the full job description here...\n\nExample: Senior Frontend Engineer at a growth-stage company building data-heavy products..."
                  className="min-h-80 w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 focus:border-primary/35 focus:ring-4 focus:ring-primary/10"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />

                <div className="grid gap-3 sm:grid-cols-3">
                  {jobHighlights.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-600 shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-slate-200/80 bg-white/95 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                <CardHeader className="border-b border-slate-200/70 pb-5">
                  <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-950">
                    <BrainCircuit className="size-4 text-primary" />
                    Your Profile
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Upload a resume or give a short self-summary so the planner
                    can match the role to your background.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                  <label
                    htmlFor="resume-upload"
                    className="block cursor-pointer rounded-3xl border border-dashed border-primary/20 bg-primary/5 px-4 py-8 text-center transition-colors hover:border-primary/30 hover:bg-primary/8"
                  >
                    <Upload className="mx-auto mb-3 size-6 text-primary" />
                    <p className="text-sm font-medium text-slate-950">
                      Click to upload or drag & drop
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      PDF or DOCX, max 5MB
                    </p>
                    {resumeFile && (
                      <p className="mt-3 text-xs font-medium text-primary">
                        Selected: {resumeFile.name}
                      </p>
                    )}
                  </label>
                  <Input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                  />

                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-slate-500">
                    <Separator className="flex-1 bg-slate-200" />
                    <span>or</span>
                    <Separator className="flex-1 bg-slate-200" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">
                      Quick Self-Description
                    </label>
                    <Textarea
                      placeholder="Briefly describe your experience, key skills, years of experience, and the roles you are targeting..."
                      className="min-h-30 w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 focus:border-primary/35 focus:ring-4 focus:ring-primary/10"
                      value={selfDescription}
                      onChange={(e) => setSelfDescription(e.target.value)}
                    />
                  </div>

                  <div className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-4 text-sm text-slate-700">
                    Either a resume or a self-description is enough to generate
                    a personalized plan.
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200/80 bg-white/95 text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                <CardContent className="pt-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-primary">
                        <BadgeCheck className="size-4" />
                        <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                          Focus
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Role match and story framing
                      </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-primary">
                        <Clock3 className="size-4" />
                        <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                          Speed
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Strategy in about 30 seconds
                      </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center gap-2 text-primary">
                        <Sparkles className="size-4" />
                        <span className="text-xs font-semibold uppercase tracking-[0.24em]">
                          Outcome
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Sharper prep, fewer blind spots
                      </p>
                    </div>
                  </div>

                  <Separator className="my-6 bg-slate-200" />

                  <div className="space-y-3">
                    {profileSteps.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
                      >
                        <div className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {index + 1}
                        </div>
                        <p className="text-sm text-slate-600">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              AI-powered strategy generation - approx 30 seconds
            </p>
            <Button
              onClick={handleGenerateReport}
              disabled={!resumeFile || loading}
              className="h-12 rounded-full bg-linear-to-r from-primary to-primary/80 px-6 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 hover:from-primary/90 hover:to-primary/70"
            >
              Generate My Interview Strategy
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
