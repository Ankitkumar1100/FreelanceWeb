import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../hooks/useData';
import FreelancerDashboard from '../components/Dashboard/FreelancerDashboard';
import ClientDashboard from '../components/Dashboard/ClientDashboard';
import ProfileSetup from '../components/Profile/ProfileSetup';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Show profile setup if profile is not complete
  if (!user.profileComplete) {
    return <ProfileSetup />;
  }

  // Render appropriate dashboard based on user role
  return user.role === 'freelancer' ? <FreelancerDashboard /> : <ClientDashboard />;
};

export default Dashboard;