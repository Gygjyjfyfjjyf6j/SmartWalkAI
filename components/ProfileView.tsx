
import React from 'react';
import { UserProfile, GoalType, ActivityLevel } from '../types';
import { User, Settings, Shield, Bell, ChevronRight, LogOut, Info } from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  setUser: (user: UserProfile | null) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, setUser }) => {
  const handleReset = () => {
    if (confirm('Are you sure you want to reset your profile and activity data?')) {
      localStorage.removeItem('smart_walk_user');
      localStorage.removeItem('smart_walk_history');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Profile Header */}
      <div className="bg-white rounded-[2rem] p-8 text-center border border-slate-100 shadow-sm">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-100 ring-4 ring-white">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
        <p className="text-sm text-slate-400 font-medium">{user.goal} • Level {user.activityLevel}</p>
        
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-50 p-3 rounded-2xl">
            <span className="block text-lg font-bold text-slate-800">{user.age}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Age</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl">
            <span className="block text-lg font-bold text-slate-800">{user.height}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Height</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl">
            <span className="block text-lg font-bold text-slate-800">{user.weight}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Weight</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Settings</h3>
        </div>
        <div className="divide-y divide-slate-50">
          <ProfileLink icon={<User size={18} />} label="Personal Information" color="text-blue-500" />
          <ProfileLink icon={<Bell size={18} />} label="Notifications" color="text-orange-500" />
          <ProfileLink icon={<Shield size={18} />} label="Privacy & Security" color="text-emerald-500" />
          <ProfileLink icon={<Settings size={18} />} label="App Preferences" color="text-indigo-500" />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-50">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Support</h3>
        </div>
        <div className="divide-y divide-slate-50">
          <ProfileLink icon={<Info size={18} />} label="Help Center" color="text-slate-500" />
          <button 
            onClick={handleReset}
            className="w-full p-4 flex items-center gap-4 hover:bg-red-50 transition-colors group"
          >
            <div className="p-2.5 rounded-xl bg-red-50 text-red-500 group-hover:bg-red-100">
              <LogOut size={18} />
            </div>
            <span className="font-bold text-slate-700 text-sm">Reset Profile</span>
            <ChevronRight size={16} className="ml-auto text-slate-300" />
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] font-medium text-slate-300 py-4 uppercase tracking-[0.2em]">
        SmartWalkAI v1.0.4 • Made with Gemini
      </p>
    </div>
  );
};

const ProfileLink: React.FC<{ icon: React.ReactNode; label: string; color: string }> = ({ icon, label, color }) => (
  <button className="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors group">
    <div className={`p-2.5 rounded-xl bg-slate-50 ${color} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <span className="font-bold text-slate-700 text-sm">{label}</span>
    <ChevronRight size={16} className="ml-auto text-slate-300" />
  </button>
);

export default ProfileView;
