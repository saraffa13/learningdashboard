import './App.css';
import SkillAssessment from './components/assessment/SkillAssessment';
import ContentFeed from './components/content/ContentFeed';
import NotificationCenter from './components/notification/NotificationCenter';
import ProfileManager from './components/profile/ProfileManager';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
        <NotificationCenter />
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-3">
              <ProfileManager />
            </div>
            <div className="md:col-span-9">
              <ContentFeed />
              <SkillAssessment />
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
