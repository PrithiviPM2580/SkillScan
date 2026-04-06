import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  Compass,
  Gauge,
  MessageSquare,
  Sparkles,
  Wrench,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import useInterview from "../hooks/useInterview";
import { useParams } from "react-router-dom";
import { SpinnerCustom } from "@/components/ui/spinner";

type Severity = "high" | "medium" | "low";

type InterviewQuestion = {
  question: string;
  intension: string;
  answer: string;
};

type SkillGap = {
  skill: string;
  severity: Severity;
};

type PreparationDay = {
  day: number;
  focus: string;
  tasks: string[];
};

type InterviewReport = {
  _id: string;
  matchScore: number;
  technicalQuestions: InterviewQuestion[];
  behavioralQuestions: InterviewQuestion[];
  skillGaps: SkillGap[];
  preparationPlan: PreparationDay[];
};

const sections = [
  {
    key: "technical",
    label: "Technical Questions",
    icon: Wrench,
  },
  {
    key: "behavioral",
    label: "Behavioral Questions",
    icon: MessageSquare,
  },
  {
    key: "roadmap",
    label: "Road Map",
    icon: Compass,
  },
] as const;

type SectionKey = (typeof sections)[number]["key"];

const severityClasses: Record<Severity, string> = {
  high: "border-rose-300/50 bg-rose-50 text-rose-700",
  medium: "border-amber-300/50 bg-amber-50 text-amber-700",
  low: "border-emerald-300/50 bg-emerald-50 text-emerald-700",
};

const Interview = () => {
  const [activeSection, setActiveSection] = useState<SectionKey>("technical");
  const [openQuestion, setOpenQuestion] = useState(0);
  const { interviewId } = useParams();
  const { report, loading, getReportById } = useInterview();

  useEffect(() => {
    if (interviewId) {
      void getReportById(interviewId);
    }
  }, [interviewId, getReportById]);

  const reportData = (report ?? null) as Partial<InterviewReport> | null;
  const technicalQuestions = reportData?.technicalQuestions ?? [];
  const behavioralQuestions = reportData?.behavioralQuestions ?? [];
  const preparationPlan = reportData?.preparationPlan ?? [];
  const skillGaps = reportData?.skillGaps ?? [];
  const matchScore =
    typeof reportData?.matchScore === "number" ? reportData.matchScore : 0;

  const activeQuestions = useMemo(() => {
    if (activeSection === "technical") {
      return technicalQuestions;
    }

    if (activeSection === "behavioral") {
      return behavioralQuestions;
    }

    return [];
  }, [activeSection, technicalQuestions, behavioralQuestions]);

  const sectionCount =
    activeSection === "technical"
      ? technicalQuestions.length
      : activeSection === "behavioral"
        ? behavioralQuestions.length
        : preparationPlan.length;

  const quickWins = preparationPlan.flatMap((item) => item.tasks).slice(0, 3);
  const topGaps = skillGaps.slice(0, 2).map((item) => item.skill);

  if (loading && !report) {
    return <SpinnerCustom />;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-350 rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
        <div className="grid min-h-[82vh] grid-cols-1 lg:grid-cols-[220px_1fr_320px]">
          <aside className="border-b border-slate-200 p-4 lg:border-r lg:border-b-0 lg:p-5">
            <p className="mb-4 text-xs font-semibold tracking-[0.28em] text-slate-500 uppercase">
              Sections
            </p>
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = section.key === activeSection;

                return (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => {
                      setActiveSection(section.key);
                      setOpenQuestion(0);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-2xl border px-3 py-2.5 text-left text-sm transition-all",
                      isActive
                        ? "border-primary/20 bg-primary/8 text-primary shadow-sm"
                        : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50",
                    )}
                  >
                    <Icon className="size-4" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="border-b border-slate-200 p-4 lg:border-r lg:border-b-0 lg:p-6">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
                {activeSection === "technical"
                  ? "Technical Questions"
                  : activeSection === "behavioral"
                    ? "Behavioral Questions"
                    : `${preparationPlan.length || 0}-Day Road Map`}
              </h1>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                {sectionCount} items
              </span>
            </div>

            {activeSection !== "roadmap" ? (
              <div className="space-y-3">
                {activeQuestions.length === 0 && (
                  <Card className="rounded-2xl border border-slate-200 bg-white">
                    <CardContent className="py-6 text-sm text-slate-600">
                      No questions available in this section yet.
                    </CardContent>
                  </Card>
                )}
                {activeQuestions.map((item, index) => {
                  const isOpen = openQuestion === index;

                  return (
                    <Card
                      key={item.question}
                      className={cn(
                        "gap-0 rounded-2xl border px-0 py-0 transition-all",
                        isOpen
                          ? "border-primary/25 bg-primary/6"
                          : "border-slate-200 bg-white hover:border-slate-300",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenQuestion(isOpen ? -1 : index)}
                        className="flex w-full items-start justify-between gap-3 px-4 py-4 text-left"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex min-w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 px-1.5 py-1 text-xs font-semibold text-primary">
                            Q{index + 1}
                          </span>
                          <p className="text-sm leading-6 font-medium text-slate-800">
                            {item.question}
                          </p>
                        </div>
                        <ChevronDown
                          className={cn(
                            "mt-1 size-4 shrink-0 text-slate-500 transition-transform",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>

                      {isOpen && (
                        <CardContent className="space-y-4 border-t border-slate-200 pb-4 pt-4">
                          <div className="rounded-xl border border-slate-200 bg-white p-3">
                            <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
                              Intension
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {item.intension}
                            </p>
                          </div>
                          <div className="rounded-xl border border-primary/15 bg-primary/5 p-3">
                            <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase">
                              Suggested Answer
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-700">
                              {item.answer}
                            </p>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {preparationPlan.length === 0 && (
                  <Card className="rounded-2xl border border-slate-200 bg-white">
                    <CardContent className="py-6 text-sm text-slate-600">
                      No roadmap available yet.
                    </CardContent>
                  </Card>
                )}
                {preparationPlan.map((item) => (
                  <Card
                    key={item.day}
                    className="gap-3 rounded-2xl border border-slate-200 bg-white px-0 py-0"
                  >
                    <CardContent className="space-y-3 py-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex min-w-13 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                          Day {item.day}
                        </span>
                        <h3 className="text-sm font-semibold text-slate-800 sm:text-base">
                          {item.focus}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {item.tasks.map((task) => (
                          <li
                            key={task}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700"
                          >
                            {task}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <aside className="p-4 lg:p-6">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">
                  Match Score
                </p>
                <div className="mt-3 flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div
                    className="relative grid size-18 place-items-center rounded-full"
                    style={{
                      background: `conic-gradient(rgb(37 99 235) ${matchScore * 3.6}deg, rgb(226 232 240) 0deg)`,
                    }}
                  >
                    <div className="grid size-14 place-items-center rounded-full bg-white text-slate-800">
                      <span className="text-2xl font-bold">{matchScore}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {matchScore >= 70
                        ? "Strong"
                        : matchScore > 0
                          ? "Developing"
                          : "Pending"}{" "}
                      match for this role
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Boost score by closing priority gaps below.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-slate-500 uppercase">
                  Skill Gaps
                </p>
                <div className="space-y-2">
                  {skillGaps.length === 0 && (
                    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                      No skill gaps available yet.
                    </div>
                  )}
                  {skillGaps.map((item) => (
                    <div
                      key={item.skill}
                      className={cn(
                        "rounded-xl border px-3 py-2",
                        severityClasses[item.severity],
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs leading-5 font-medium">
                          {item.skill}
                        </p>
                        <span className="inline-flex items-center rounded-md border border-current/25 px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.16em] uppercase">
                          {item.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-2 text-primary">
                  <Gauge className="size-4" />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                    Recommendation
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {topGaps.length > 0
                    ? `Prioritize ${topGaps.join(" and ")} first, then reinforce with focused practice before interviews.`
                    : "Your recommendation will appear after the report is generated."}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-700">
                  <Sparkles className="size-4" />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                    Quick Wins
                  </span>
                </div>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {quickWins.length === 0 && (
                    <li className="rounded-lg bg-white px-3 py-2">
                      Quick wins will appear after the roadmap is generated.
                    </li>
                  )}
                  {quickWins.map((task) => (
                    <li key={task} className="rounded-lg bg-white px-3 py-2">
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Interview;
