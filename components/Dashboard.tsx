
import React from 'react';
import { Footprints, MapPin, Flame, Clock, Sparkles, RefreshCw } from 'lucide-react';
import { UserProfile, ActivityDay, AIAdvice } from '../types';

interface DashboardProps {
  user: UserProfile;
  activity: ActivityDay;
  aiAdvice: AIAdvice | null;
  loadingAdvice: boolean;
  onRefreshAdvice: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, activity, aiAdvice, loadingAdvice, onRefreshAdvice }) => {
  const progress = Math.min((activity.steps / user.dailyStepGoal) * 100, 100);
  const color = progress >= 100 ? 'text-green-500' : 'text-blue-600';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Step Circle Card */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Footprints size={120} />
        </div>
        
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Progress Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="112" cy="112" r="100"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="112" cy="112" r="100"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={628.3}
              strokeDashoffset={628.3 - (628.3 * progress) / 100}
              strokeLinecap="round"
              className={`${color} transition-all duration-1000 ease-out`}
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tracking-tight">{activity.steps.toLocaleString()}</span>
            <span className="text-sm font-medium text-slate-400 mt-1">Steps Today</span>
            <div className={`mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${progress >= 100 ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
              Goal: {user.dailyStepGoal.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="w-full grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-50">
          <StatBox icon={<MapPin size={18} />} value={`${activity.distance}`} unit="km" label="Distance" color="text-emerald-500" bg="bg-emerald-50" />
          <StatBox icon={<Flame size={18} />} value={`${activity.calories}`} unit="kcal" label="Calories" color="text-orange-500" bg="bg-orange-50" />
          <StatBox icon={<Clock size={18} />} value={`${activity.activeMinutes}`} unit="min" label="Active" color="text-blue-500" bg="bg-blue-50" />
        </div>
      </div>

      {/* AI Coach Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-xl">
            <Sparkles size={20} className="text-blue-100" />
          </div>
          <h3 className="font-bold text-lg">AI Coach Analysis</h3>
          <button 
            onClick={onRefreshAdvice}
            disabled={loadingAdvice}
            className="ml-auto p-2 hover:bg-white/10 rounded-full transition-colors disabled:opacity-30"
          >
            <RefreshCw size={16} className={loadingAdvice ? 'animate-spin' : ''} />
          </button>
        </div>

        {loadingAdvice ? (
          <div className="py-8 flex flex-col items-center justify-center gap-3">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <p className="text-xs text-white/60 font-medium">Analyzing your patterns...</p>
          </div>
        ) : aiAdvice ? (
          <div className="space-y-4 animate-in fade-in duration-500">
            <p className="text-sm leading-relaxed text-indigo-50 font-medium italic">
              "{aiAdvice.message}"
            </p>
            <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
              <p className="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Coach's Motivation</p>
              <p className="text-sm font-semibold">{aiAdvice.motivation}</p>
            </div>
            <div className="flex items-start gap-3 pt-2">
              <div className="text-yellow-300 shrink-0">💡</div>
              <p className="text-xs text-indigo-100 leading-snug"><span className="font-bold text-white">Daily Tip:</span> {aiAdvice.tip}</p>
            </div>
          </div>
        ) : (
          <p className="text-sm opacity-60">Tap the refresh icon to get insights from your coach!</p>
        )}
      </div>

      {/* Mini Progress Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-slate-800">Activity Level</h4>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase">Optimal</span>
        </div>
        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-1000" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-2 font-medium">
          {progress < 100 ? `${user.dailyStepGoal - activity.steps} steps remaining to reach your daily goal.` : 'Daily goal achieved! You are on fire today! 🔥'}
        </p>
      </div>
    </div>
  );
};

const StatBox: React.FC<{ icon: React.ReactNode; value: string; unit: string; label: string; color: string; bg: string }> = ({ icon, value, unit, label, color, bg }) => (
  <div className="flex flex-col items-center gap-1">
    <div className={`p-2.5 rounded-2xl ${bg} ${color} mb-1`}>
      {icon}
    </div>
    <div className="flex items-baseline gap-0.5">
      <span className="text-lg font-bold text-slate-800">{value}</span>
      <span className="text-[10px] font-bold text-slate-400">{unit}</span>
    </div>
    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">{label}</span>
  </div>
);

export default Dashboard;
