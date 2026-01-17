import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  FileText, 
  Clock, 
  Heart, 
  Shield, 
  Zap,
  ArrowRight,
  Activity,
  Calendar
} from 'lucide-react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const UserDashboard = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  const success = queryParams.get("success");
  const packageType = queryParams.get("package");

  useEffect(()=>{
    if(user?._id && success && packageType){
      axiosPublic.patch(`/users/${user?._id}`, {package:packageType.toLocaleLowerCase()}).then((res)=>{
        alert("Package Updated Successfully");
        // ✅ Remove query params from URL
        const newUrl = window.location.pathname;
        window.history.replaceState(null, "", newUrl);
      }).catch((err)=>{
        console.log(err)
      })
    }
  },[success, packageType, user?._id])


    const [history, setHistory] = useState([]);
  
    useEffect(() => {
      axiosPublic.get(`/cases?email=${user.email}`)
        .then(res => {
          setHistory(res?.data || []);
        })
        .catch(err => {
          console.error('Error fetching history:', err);
        });
    }, [axiosPublic, user.email]);

  const stats = [
    {
      label: 'Forms Submitted',
      value: '12',
      icon: <FileText className="h-6 w-6" />,
      color: 'blue'
    },
    {
      label: 'Solutions Found',
      value: '10',
      icon: <Heart className="h-6 w-6" />,
      color: 'green'
    },
    {
      label: 'Days Active',
      value: '45',
      icon: <Calendar className="h-6 w-6" />,
      color: 'purple'
    },
    {
      label: 'Response Time',
      value: '<30s',
      icon: <Zap className="h-6 w-6" />,
      color: 'yellow'
    }
  ];

  const recentSubmissions = [
    {
      id: 1,
      symptoms: 'Headache, Fever',
      result: 'Rest and hydration recommended',
      date: '2025-01-15',
      accuracy: '92%'
    },
    {
      id: 2,
      symptoms: 'Chest pain',
      result: 'Consult doctor immediately',
      date: '2025-01-14',
      accuracy: 'N/A'
    },
    {
      id: 3,
      symptoms: 'Minor cut',
      result: 'Clean wound and apply bandage',
      date: '2025-01-13',
      accuracy: '88%'
    }
  ];

  const packageFeatures = {
    free: ['1 form per day', 'Basic first-aid advice', 'Community support'],
    standard: ['Unlimited forms', 'Priority support', 'Advanced AI matching', 'History tracking'],
    premium: ['All Standard features', 'Doctor consultation', '24/7 emergency support', 'Family account']
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Your health and safety dashboard. Submit symptoms to get instant first-aid guidance.
          </p>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/submit-form"
                  className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Submit Symptoms</h3>
                      <p className="text-blue-100 text-sm">Get instant first-aid advice</p>
                    </div>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  to="/history"
                  className="bg-gray-100 text-gray-900 p-6 rounded-lg hover:bg-gray-200 transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">View History</h3>
                      <p className="text-gray-600 text-sm">See past submissions</p>
                    </div>
                    <Clock className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Submissions</h2>
                <Link
                  to="/history"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {history?.map((submission) => (
                  <div
                    key={submission?._id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {
                            submission?.result?.title
                          }
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {submission?.result?.description}
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(submission?.submittedAt).toLocaleDateString()}
                          {submission?.accuracy !== 'N/A' && (
                            <>
                              <span className="mx-2">•</span>
                              <Activity className="h-3 w-3 mr-1" />
                              {submission?.result?.accuracy} accuracy
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Package */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Current Package</h3>
              <div className="text-center mb-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user?.package === 'premium' ? 'bg-purple-100 text-purple-800' :
                  user?.package === 'standard' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {user?.package?.charAt(0).toUpperCase() + user?.package?.slice(1)} Plan
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {packageFeatures[user?.package]?.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Shield className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {user?.package === 'free' && (
                <Link
                  to="/packages"
                  className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Upgrade Plan
                </Link>
              )}
            </div>

            {/* Health Tips */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Daily Health Tip</h3>
              <p className="text-gray-700 text-sm mb-4">
                Keep a well-stocked first aid kit at home and in your car. Check expiration 
                dates regularly and replace items as needed.
              </p>
              <Link
                to="/blogs"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center"
              >
                Read More Tips
                <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            {/* Emergency Contact */}
            {/* <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <h3 className="text-lg font-bold text-red-900 mb-3">Emergency</h3>
              <p className="text-red-800 text-sm mb-4">
                For life-threatening emergencies, call emergency services immediately.
              </p>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-900">911</div>
                <div className="text-red-700 text-xs">Emergency Services</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;