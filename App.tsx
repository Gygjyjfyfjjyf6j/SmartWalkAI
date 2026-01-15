
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home, 
  Trophy, 
  BarChart2, 
  User, 
  Flame, 
  Footprints, 
  MapPin, 
  Clock,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { 
  UserProfile, 
  ActivityDay, 
  GoalType, 
  ActivityLevel, 
  Challenge,
  Badge,
  AIAdvice
} from './types';
import { getAICoachAdvice, suggestDailyGoal } from './geminiService';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line
} from 'recharts';

// Components
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Challenges from './components/Challenges';
import Analytics from './components/Analytics';
import ProfileView from './components/ProfileView';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'challenges' | 'analytics' | 'profile'>('home');
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('smart_walk_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activityHistory, setActivityHistory] = useState<ActivityDay[]>(() => {
    const saved = localStorage.getItem('smart_walk_history');
    if (saved) return JSON.parse(saved);
    
    // Generate dummy historical data
    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (7 - i));
      const steps = Math.floor(Math.random() * 5000) + 4000;
      return {
        date: date.toISOString().split('T')[0],
        steps,
        distance: parseFloat((steps * 0.0007).toFixed(2)),
        calories: Math.floor(steps * 0.04),
        activeMinutes: Math.floor(steps / 100)
      };
    });
  });

  const [currentDay, setCurrentDay] = useState<ActivityDay>(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const existing = activityHistory.find(d => d.date === todayStr);
    return existing || {
      date: todayStr,
      steps: 0,
      distance: 0,
      calories: 0,
      activeMinutes: 0
    };
  });

  const [aiAdvice, setAiAdvice] = useState<AIAdvice | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    if (user) localStorage.setItem('smart_walk_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('smart_walk_history', JSON.stringify(activityHistory));
  }, [activityHistory]);

  // Handle Simulation (In real app, this would be sensor data)
  useEffect(() => {
    if (!user?.onboarded) return;

    const interval = setInterval(() => {
      setCurrentDay(prev => {
        const newSteps = prev.steps + Math.floor(Math.random() * 5);
        return {
          ...prev,
          steps: newSteps,
          distance: parseFloat((newSteps * 0.0007).toFixed(2)),
          calories: Math.floor(newSteps * 0.04),
          activeMinutes: Math.floor(newSteps / 100)
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [user?.onboarded]);

  const fetchAIAdvice = useCallback(async () => {
    if (user && activityHistory.length > 0) {
      setLoadingAdvice(true);
      const advice = await getAICoachAdvice(user, activityHistory.slice(-3));
      setAiAdvice(advice);
      setLoadingAdvice(false);
    }
  }, [user, activityHistory]);

  useEffect(() => {
    if (user?.onboarded && !aiAdvice) {
      fetchAIAdvice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.onboarded]);

  const handleOnboardingComplete = async (profile: Partial<UserProfile>) => {
    const goal = await suggestDailyGoal(profile);
    const fullProfile: UserProfile = {
      ...(profile as any),
      dailyStepGoal: goal,
      onboarded: true
    };
    setUser(fullProfile);
  };

  if (!user || !user.onboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SmartWalkAI
            </h1>
            <p className="text-xs text-slate-500 font-medium">Hello, {user.name} 👋</p>
          </div>
          <button 
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100"
          >
            <User size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {activeTab === 'home' && (
          <Dashboard 
            user={user} 
            activity={currentDay} 
            aiAdvice={aiAdvice} 
            loadingAdvice={loadingAdvice}
            onRefreshAdvice={fetchAIAdvice}
          />
        )}
        {activeTab === 'challenges' && (
          <Challenges steps={currentDay.steps} />
        )}
        {activeTab === 'analytics' && (
          <Analytics history={[...activityHistory, currentDay]} />
        )}
        {activeTab === 'profile' && (
          <ProfileView user={user} setUser={setUser} />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-around items-center z-50 shadow-lg">
        <NavButton 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
          icon={<Home size={22} />} 
          label="Home" 
        />
        <NavButton 
          active={activeTab === 'challenges'} 
          onClick={() => setActiveTab('challenges')} 
          icon={<Trophy size={22} />} 
          label="Challenges" 
        />
        <NavButton 
          active={activeTab === 'analytics'} 
          onClick={() => setActiveTab('analytics')} 
          icon={<BarChart2 size={22} />} 
          label="Stats" 
        />
        <NavButton 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')} 
          icon={<User size={22} />} 
          label="Profile" 
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-200 ${active ? 'text-blue-600' : 'text-slate-400'}`}
  >
    <div className={`p-1 rounded-lg transition-colors ${active ? 'bg-blue-50' : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-semibold tracking-wide uppercase">{label}</span>
  </button>
);

export default App;
