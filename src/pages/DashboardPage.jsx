import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useSeekerStore from '../store/seekerStore';
import SeekerDashboard from '../features/dashboard/SeekerDashboard';
import EmployerDashboard from '../features/dashboard/EmployerDashboard';
import AdminDashboard from '../features/dashboard/AdminDashboard';

/**
 * Dashboard Page Component
 * Routes users to their specific dashboard based on role
 */
const DashboardPage = () => {
  const { user } = useAuthStore();
  const { profile, fetchProfile, isLoading, isInitialized } = useSeekerStore();

  useEffect(() => {
    // Only fetch seeker profile if the user is a seeker
    if (user?.userType === 'SEEKER') {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  const renderDashboard = () => {
    switch (user?.userType) {
      case 'ADMIN':
        return <AdminDashboard user={user} />;
      case 'EMPLOYER':
        return <EmployerDashboard user={user} />;
      case 'SEEKER':
        return <SeekerDashboard user={user} profile={profile} />;
      default:
        // Fallback or guest view
        return <SeekerDashboard user={user} profile={profile} />;
    }
  };

  return (
    <>
      {renderDashboard()}
    </>
  );
};

export default DashboardPage;

