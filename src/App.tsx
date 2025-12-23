import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider, GameProvider } from './store';
import {
  HomePage,
  SettingsPage,
  LearningPage,
  QuestionPage,
  ResultsPage,
  ProgressPage,
  AchievementsPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <GameProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/learn" element={<LearningPage />} />
            <Route path="/play" element={<QuestionPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
          </Routes>
        </GameProvider>
      </ProgressProvider>
    </BrowserRouter>
  );
}

export default App;
