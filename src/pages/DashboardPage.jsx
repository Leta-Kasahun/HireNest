import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, CheckCircle2 } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useSeekerStore from '../store/seekerStore';
import { ROUTES } from '../config/constants';
import Button from '../components/Button';

/**
 * Dashboard Page Component
 * Role-specific dashboard content
 */
const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { profile, isLoading, isInitialized, fetchProfile } = useSeekerStore();

  useEffect(() => {
    if (user?.role === 'ROLE_SEEKER' || user?.userType === 'SEEKER') {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  const getDashboardContent = () => {
    switch (user?.userType) {
      case 'ADMIN':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary dark:text-white">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-gray-500 mb-2">Total Users</div>
                <div className="text-3xl font-bold text-primary dark:text-white">1,234</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-gray-500 mb-2">Active Jobs</div>
                <div className="text-3xl font-bold text-secondary">567</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-gray-500 mb-2">Applications</div>
                <div className="text-3xl font-bold text-accent">8,901</div>
              </div>
            </div>
          </div>
        );

      case 'EMPLOYER':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary dark:text-white">Employer Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-gray-500 mb-2">Active Jobs</div>
                <div className="text-3xl font-bold text-secondary">12</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-gray-500 mb-2">Applications</div>
                <div className="text-3xl font-bold text-accent">145</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-gray-500 mb-2">Interviews</div>
                <div className="text-3xl font-bold text-warning">23</div>
              </div>
            </div>
          </div>
        );

      case 'SEEKER':
      default:
        return (
          <div className="space-y-8">
            {/* Profile Completion CTA */}
            {!profile && !isLoading && isInitialized && (
              <div className="bg-gradient-to-r from-secondary to-secondary-light rounded-[2rem] p-8 text-white shadow-xl shadow-secondary/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                  <User size={120} />
                </div>
                <div className="relative z-10 max-w-lg">
                  <h3 className="text-2xl font-black mb-2 tracking-tight">Complete your profile!</h3>
                  <p className="text-white/80 mb-6 font-medium">Your profile is currently empty. Complete it now to get personalized job recommendations and stand out to employers.</p>
                  <Button
                    onClick={() => navigate(ROUTES.SEEKER.PROFILE)}
                    className="!bg-white !text-secondary hover:!bg-white/90 !rounded-full !px-8 !py-3 font-bold shadow-lg"
                  >
                    Setup Profile
                  </Button>
                </div>
              </div>
            )}

            <h2 className="text-2xl font-black text-primary dark:text-white flex items-center gap-3">
              <Briefcase className="text-secondary" /> Seeker Dashboard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-3xl p-8 hover:shadow-2xl transition-all group">
                <div className="text-gray-400 dark:text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Applications</div>
                <div className="text-4xl font-black text-secondary group-hover:scale-110 transition-transform origin-left">8</div>
              </div>
              <div className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-3xl p-8 hover:shadow-2xl transition-all group">
                <div className="text-gray-400 dark:text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Interviews</div>
                <div className="text-4xl font-black text-accent group-hover:scale-110 transition-transform origin-left">3</div>
              </div>
              <div className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-3xl p-8 hover:shadow-2xl transition-all group">
                <div className="text-gray-400 dark:text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Saved Jobs</div>
                <div className="text-4xl font-black text-warning group-hover:scale-110 transition-transform origin-left">15</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700/30 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-primary dark:text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-accent" size={20} /> Recommended Jobs
              </h3>
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto font-medium">
                  {profile ? "No recommended jobs yet. We're matching your profile with active listings." : "Complete your profile to get personalized job matches based on your skills."}
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1C2D] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-primary dark:text-white mb-2 tracking-tight">
            Welcome back, {user?.name || user?.email}!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Here's what's happening with your account today
          </p>
        </div>

        {getDashboardContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
