import AppRoute from "./routes/AppRoute";
import { AuthProvider } from "./features/auth/context/AuthContext";
import { InterviewProvider } from "./features/interview/context/InterviewContext";

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
        <AppRoute />
      </InterviewProvider>
    </AuthProvider>
  );
};

export default App;
