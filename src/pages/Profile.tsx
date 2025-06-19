
import Navbar from '@/components/Navbar';
import ProfileEditForm from '@/components/ProfileEditForm';
import TestHistory from '@/components/TestHistory';
import { useProfile } from '@/hooks/useProfile';
import { User, Settings } from 'lucide-react';

const Profile = () => {
  const { profile, testHistory, loading, updating, updateProfile } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-medical-blue/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-medical-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile?.name || 'Meu Perfil'}
              </h1>
              <p className="text-gray-600">
                Gerencie suas informações e acompanhe seu progresso vocacional
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Profile Section */}
          <ProfileEditForm 
            profile={profile}
            onSave={updateProfile}
            updating={updating}
          />

          {/* Test History Section */}
          <TestHistory 
            tests={testHistory}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
