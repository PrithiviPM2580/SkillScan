import React, { createContext, useState } from "react";

export interface InterviewContextType {
  report: any;
  reports: any[];
  loading: boolean;
  error: string | null;
  setReport: React.Dispatch<React.SetStateAction<any>>;
  setReports: React.Dispatch<React.SetStateAction<any[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const InterviewContext = createContext<InterviewContextType | null>(
  null,
);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [report, setReport] = useState<any | null>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <InterviewContext.Provider
      value={{
        report,
        reports,
        loading,
        error,
        setReport,
        setReports,
        setLoading,
        setError,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
