import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  Activity, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Phone,
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalSubmissions: 3892,
    todaySubmissions: 47,
    activeUsers: 892,
    emergencyCases: 23,
    consultCases: 156,
    firstAidCases: 3713
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'user_registration',
      user: 'John Doe',
      action: 'New user registered',
      timestamp: '2025-01-15T10:30:00Z',
      package: 'standard'
    },
    {
      id: 2,
      type: 'form_submission',
      user: 'Sarah Smith',
      action: 'Submitted symptoms: Headache, Fever',
      timestamp: '2025-01-15T10:25:00Z',
      result: 'advice'
    },
    {
      id: 3,
      type: 'emergency',
      user: 'Mike Johnson',
      action: 'Emergency case: Chest pain',
      timestamp: '2025-01-15T10:20:00Z',
      result: 'emergency'
    },
    {
      id: 4,
      type: 'form_submission',
      user: 'Emily Davis',
      action: 'Submitted symptoms: Minor cut',
      timestamp: '2025-01-15T10:15:00Z',
      result: 'advice'
    },
    {
      id: 5,
      type: 'user_upgrade',
      user: 'Robert Wilson',
      action: 'Upgraded to Premium package',
      timestamp: '2025-01-15T10:10:00Z',
      package: 'premium'
    }
  ]);

  const [topSymptoms, setTopSymptoms] = useState([
    { symptom: 'Headache', count: 234, percentage: 18.5 },
    { symptom: 'Fever', count: 198, percentage: 15.6 },
    { symptom: 'Cough', count: 167, percentage: 13.2 },
    { symptom: 'Sore throat', count: 145, percentage: 11.4 },
    { symptom: 'Nausea', count: 123, percentage: 9.7 },
    { symptom: 'Fatigue', count: 98, percentage: 7.7 },
    { symptom: 'Chest pain', count: 87, percentage: 6.9 },
    { symptom: 'Dizziness', count: 76, percentage: 6.0 }
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_registration':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'form_submission':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'emergency':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'user_upgrade':
        return <TrendingUp className="h-4 w-4 text-purple-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user_registration':
        return 'bg-blue-50 border-blue-200';
      case 'form_submission':
        return 'bg-green-50 border-green-200';
      case 'emergency':
        return 'bg-red-50 border-red-200';
      case 'user_upgrade':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Monitor platform activity, user submissions, and system analytics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSubmissions.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+8% from last month</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todaySubmissions}</p>
                <p className="text-xs text-blue-600 mt-1">+5% from yesterday</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-1">+15% from last week</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Results Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">First Aid Cases</p>
                <p className="text-2xl font-bold text-green-900">{stats.firstAidCases.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">95.4% of all cases</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Doctor Consultations</p>
                <p className="text-2xl font-bold text-orange-900">{stats.consultCases}</p>
                <p className="text-xs text-gray-500 mt-1">4.0% of all cases</p>
              </div>
              <Phone className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emergency Cases</p>
                <p className="text-2xl font-bold text-red-900">{stats.emergencyCases}</p>
                <p className="text-xs text-gray-500 mt-1">0.6% of all cases</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-4 rounded-lg border ${getActivityColor(activity.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatTimestamp(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Symptoms */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Most Common Symptoms</h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {topSymptoms.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900 w-4">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700">{item.symptom}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <Users className="h-5 w-5 mr-2" />
              Manage Users
            </button>
            <button className="flex items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
              <FileText className="h-5 w-5 mr-2" />
              View Forms
            </button>
            <button className="flex items-center justify-center p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
              <Activity className="h-5 w-5 mr-2" />
              Health Solutions
            </button>
            <button className="flex items-center justify-center p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
              <BarChart3 className="h-5 w-5 mr-2" />
              Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;