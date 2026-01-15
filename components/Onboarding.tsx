
import React, { useState } from 'react';
import { UserProfile, GoalType, ActivityLevel } from '../types';
import { ChevronRight, ArrowLeft, Footprints } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: Partial<UserProfile>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    age: 25,
    height: 170,
    weight: 70,
    goal: GoalType.GENERAL_HEALTH,
    activityLevel: ActivityLevel.MEDIUM
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleFinish = () => {
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-indigo-600 flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl text-slate-900 min-h-[500px] flex flex-col">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= step ? 'bg-indigo-600' : 'bg-slate-100'}`} 
            />
          ))}
        </div>

        {step === 1 && (
          <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
              <Footprints size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to SmartWalkAI</h2>
            <p className="text-slate-500 mb-8">Let's start with the basics to personalize your journey.</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Age</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: parseInt(e.target.value) })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Gender (Optional)</label>
                  <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                    <option>Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold mb-2">Physical Details</h2>
            <p className="text-slate-500 mb-8">This helps our AI coach calculate calories accurately.</p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">Height (cm)</label>
                  <span className="text-sm font-bold text-indigo-600">{formData.height} cm</span>
                </div>
                <input 
                  type="range" min="120" max="220" 
                  value={formData.height}
                  onChange={e => setFormData({ ...formData, height: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-700">Weight (kg)</label>
                  <span className="text-sm font-bold text-indigo-600">{formData.weight} kg</span>
                </div>
                <input 
                  type="range" min="30" max="150" 
                  value={formData.weight}
                  onChange={e => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold mb-2">Your Fitness Goals</h2>
            <p className="text-slate-500 mb-8">Choose what you want to achieve.</p>
            
            <div className="space-y-3">
              {[GoalType.WEIGHT_LOSS, GoalType.FITNESS, GoalType.GENERAL_HEALTH].map(goal => (
                <button
                  key={goal}
                  onClick={() => setFormData({ ...formData, goal })}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${formData.goal === goal ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
                >
                  <p className="font-bold">{goal}</p>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Activity Level</label>
              <div className="grid grid-cols-3 gap-2">
                {[ActivityLevel.LOW, ActivityLevel.MEDIUM, ActivityLevel.HIGH].map(level => (
                  <button
                    key={level}
                    onClick={() => setFormData({ ...formData, activityLevel: level })}
                    className={`py-2 px-1 rounded-lg text-xs font-bold border transition-all ${formData.activityLevel === level ? 'bg-indigo-600 text-white border-indigo-600' : 'text-slate-500 border-slate-200'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="mt-auto pt-8 flex gap-3">
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Back
            </button>
          )}
          <button 
            onClick={step < 3 ? nextStep : handleFinish}
            disabled={step === 1 && !formData.name}
            className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
          >
            {step < 3 ? 'Continue' : 'Get Started'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
