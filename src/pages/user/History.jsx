import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Activity, 
  FileText, 
  Search, 
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Phone
} from 'lucide-react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useAuth } from '../../contexts/AuthContext';

const History = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    axiosPublic.get(`/cases?email=${user.email}`)
      .then(res => {
        setHistory(res?.data || []);
        setFilteredHistory(res?.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching history:', err);
      });
  }, [axiosPublic, user.email, loading]);

  useEffect(() => {
    let filtered = [...history];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.symptoms.some(symptom => 
          symptom.toLowerCase().includes(searchTerm.toLowerCase())
        ) || item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.result.type === filterType);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.submittedAt) - new Date(a.submittedAt);
        case 'oldest':
          return new Date(a.submittedAt) - new Date(b.submittedAt);
        case 'severity':
          const severityOrder = { critical: 4, severe: 3, moderate: 2, mild: 1 };
          return severityOrder[b.severity] - severityOrder[a.severity];
        default:
          return 0;
      }
    });

    setFilteredHistory(filtered);
  }, [history, searchTerm, filterType, sortBy]);

  const getResultIcon = (type) => {
    switch (type) {
      case 'emergency':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'consult':
        return <Phone className="h-5 w-5 text-orange-600" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  const getResultBadge = (type) => {
    switch (type) {
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'consult':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'severe':
        return 'bg-orange-100 text-orange-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `health-history-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Case?')) {
      setLoading(true);
      axiosPublic.delete(`/cases/${id}`).then( res => {
        if(res?.data?.deletedCount){
          alert('Case deleted successfully!');
          setLoading(false);
        }else{
          alert('Failed to delete the Case. Please try again.');
          setLoading(false);
        }
      })
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submission History</h1>
          <p className="text-gray-600">
            View and manage your past symptom submissions and results.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search symptoms or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="severity">By Severity</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{history.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">First Aid Given</p>
                <p className="text-2xl font-bold text-gray-900">
                  {history?.length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Doctor Referrals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {history?.length}
                </p>
              </div>
              <Phone className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emergencies</p>
                <p className="text-2xl font-bold text-gray-900">
                  {history?.length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div> */}

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterType !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'You haven\'t submitted any forms yet.'
                }
              </p>
              {!searchTerm && filterType === 'all' && (
                <Link
                  to="/submit-form"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Your First Form
                </Link>
              )}
            </div>
          ) : (
            filteredHistory.map((submission) => (
              <div
                key={submission._id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow relative"
              >
                <button onClick={() => handleDelete(submission._id)} className='absolute top-3 right-3 text-white bg-red-600 hover:bg-red-800 px-5 py-1 rounded-full'>Delete</button>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {getResultIcon(submission?.result?.type)}
                      <h3 className="text-lg font-semibold text-gray-900">
                        {submission?.result?.title}
                      </h3>
                      {/* ${getResultBadge(submission?.result?.type)} */}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium `}>
                        {submission?.result?.type === 'advice' ? 'First Aid' :
                         submission?.result?.type === 'consult' ? 'Consult Doctor' :
                         'Emergency'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Activity className="h-4 w-4 mr-2" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityBadge(submission.severity)}`}>
                          {submission.severity}
                        </span>
                      </div>

                      {submission.accuracy && (
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="font-medium">Accuracy: {Math.round(submission.accuracy)}%</span>
                        </div>
                      )}

                      <div className="flex items-center text-sm text-gray-600">
                        <span>{submission.symptoms.length} symptom{submission.symptoms.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Symptoms:</h4>
                      <div className="flex flex-wrap gap-2">
                        {submission.symptoms.map((symptom, index) => (
                          <span
                            key={index}
                            className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  <p className='mt-1 mb-2'>{submission?.result?.description}</p>
                  <hr className='border-gray-200 my-4' />
                    </div>
                  </div>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2 ">System Result:</h4>
                      <div className='flex items-center gap-1'>
                      <p className="text-sm text-gray-600">{submission?.result?.title}</p>
                      {submission?.result?.accuracy && (
                        <p className="text-xs text-gray-500">
                          (Accuracy: {Math.round(submission?.result?.accuracy)}%)
                        </p>
                      )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Medicin:</h4>
                      {
                        submission?.result?.medicin?.length > 0 ? (
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {submission.result.medicin.map((med, idx) => (
                              <li key={idx}>
                                <span className="font-medium">{med.name}</span> - {med.dose}, {med.duration}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-600">No medicin recommended.</p>
                        )
                      }

                  <div className="ml-4 flex-shrink-0">
                    {/* <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </button> */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination would go here in a real app */}
        {filteredHistory.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Showing {filteredHistory.length} of {history.length} submissions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;