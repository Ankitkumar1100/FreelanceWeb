import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../hooks/useData';
import { 
  BarChart3, 
  DollarSign, 
  Star, 
  Users,
  MessageCircle,
  TrendingUp,
  Calendar,
  Eye,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Briefcase
} from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();
  const { jobs, freelancers } = useData();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Spent', value: '$8,750', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900' },
    { label: 'Active Projects', value: '2', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900' },
    { label: 'Jobs Posted', value: '12', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900' }
  ];

  const recentActivity = [
    { type: 'proposal', content: 'New proposal received for E-commerce Website', time: '2 minutes ago', icon: MessageCircle, color: 'text-blue-500' },
    { type: 'milestone', content: 'Milestone completed for Mobile App UI', time: '1 hour ago', icon: CheckCircle, color: 'text-green-500' },
    { type: 'message', content: 'Message from Sarah Johnson', time: '3 hours ago', icon: MessageCircle, color: 'text-blue-500' },
    { type: 'payment', content: 'Payment of $450 processed', time: '1 day ago', icon: DollarSign, color: 'text-green-500' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'My Projects' },
    { id: 'freelancers', label: 'Find Freelancers' },
    { id: 'proposals', label: 'Proposals' },
    { id: 'spending', label: 'Spending' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Monitor your projects and find the best freelancers
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    <div className="text-center">
                      <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Post New Job
                      </span>
                    </div>
                  </button>
                  <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                    <div className="text-center">
                      <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Browse Freelancers
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Spending Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Spending Overview
                  </h3>
                  <div className="flex items-center space-x-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">+8.2%</span>
                  </div>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">Chart visualization would go here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  My Projects
                </h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Post New Job
                </button>
              </div>
              <div className="space-y-4">
                {jobs.filter(job => job.clientId === user?.id).map((job) => (
                  <div key={job.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {job.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Budget: ${job.budget} {job.type === 'hourly' ? '/hr' : 'fixed'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Posted: {new Date(job.postedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs rounded-full">
                          {job.status}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {job.proposals.length} proposals
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'freelancers' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search freelancers..."
                      className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Freelancer Listings */}
              <div className="space-y-4">
                {freelancers.map((freelancer) => (
                  <div key={freelancer.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={freelancer.avatar}
                        alt={freelancer.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {freelancer.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {freelancer.rating} ({freelancer.totalReviews} reviews)
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                          {freelancer.bio}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {freelancer.skills?.slice(0, 3).map((skill) => (
                              <span key={skill} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              ${freelancer.hourlyRate}/hr
                            </span>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                              Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {activity.content}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Deadlines */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Project Deadlines
            </h3>
            <div className="space-y-3">
              {[
                { title: 'E-commerce Website', deadline: 'Due in 5 days', urgent: false },
                { title: 'Mobile App UI', deadline: 'Due in 2 weeks', urgent: false }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Calendar className={`h-5 w-5 ${item.urgent ? 'text-red-500' : 'text-orange-500'}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className={`text-xs ${item.urgent ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                      {item.deadline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;