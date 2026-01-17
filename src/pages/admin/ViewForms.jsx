import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  Calendar,
  User,
  Activity,
  AlertTriangle,
  CheckCircle,
  Phone,
  Eye,
  Download,
  MoreVertical,
  X
} from 'lucide-react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useAuth } from '../../contexts/AuthContext';

const ViewForms = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterResult, setFilterResult] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [selectedForm, setSelectedForm] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedMedicin, setUpdatedMedicin] = useState([]);
  const [updatedDescription, setUpdatedDescription] = useState('');

  // Mock form submissions data
  useEffect(() => {
    axiosPublic.get(`/cases`)
      .then(res => {
        setForms(res?.data || []);
        setFilteredForms(res?.data || []);
      })
      .catch(err => {
        console.error('Error fetching history:', err);
      });
  }, [axiosPublic]);

  // Filter forms based on search and filters
  useEffect(() => {
    let filtered = [...forms];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(form =>
        form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.submissionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.symptoms.some(symptom =>
          symptom.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply result filter
    if (filterResult !== 'all') {
      // form?.result?.type === 'advice' ? 'First Aid' :
      //   form?.result?.type === 'consult' ? 'Consult Doctor' :
      //   'Emergency'

    }

    // Apply severity filter
    if (filterSeverity !== 'all') {
      filtered = filtered.filter(form => form.severity === filterSeverity);
    }

    // Sort by submission date (newest first)
    filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

    setFilteredForms(filtered);
  }, [forms, searchTerm, filterResult, filterSeverity]);

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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleViewDetails = (form) => {
    setSelectedForm(form);
    setShowModal(true);
    setUpdatedMedicin(form?.result?.medicin || []);
    setUpdatedDescription(form?.result?.description || '');
  };

  const exportForms = () => {
    const dataStr = JSON.stringify(filteredForms, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `form-submissions-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleUpdateForm = () => {
    const updatedForm = {
      ...selectedForm,
      result: {
        ...selectedForm?.result,
        medicin: updatedMedicin,
        description: updatedDescription,
      },
    };
  
    // remove _id before sending
    const { _id, ...formWithoutId } = updatedForm;
  
    axiosPublic
      .patch(`/cases/${selectedForm?._id}`, formWithoutId) // send without _id
      .then((res) => {
        alert('Form updated successfully!');
        setShowModal(false);
  
        // update local state
        setForms((prevForms) =>
          prevForms.map((form) =>
            form._id === selectedForm?._id ? { ...form, ...formWithoutId } : form
          )
        );
      })
      .catch((err) => {
        console.error('Error updating form:', err);
        alert('Failed to update the form.');
      });
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">View User Forms</h1>
              <p className="text-gray-600">
                Review submitted forms and system-suggested solutions.
              </p>
            </div>
            {/* <button
              onClick={exportForms}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button> */}
          </div>
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Forms</p>
                <p className="text-2xl font-bold text-gray-900">{forms?.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Emergency Cases</p>
                <p className="text-2xl font-bold text-gray-900">
                  {forms?.filter(f => f?.result?.type === 'emergency')?.length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Doctor Referrals</p>
                <p className="text-2xl font-bold text-gray-900">
                  {forms?.filter(f => f?.result?.type === 'consult').length}
                </p>
              </div>
              <Phone className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">First Aid Given</p>
                <p className="text-2xl font-bold text-gray-900">
                  {forms?.filter(f => f?.result?.type === 'advice')?.length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div> */}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Result Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filterResult}
                onChange={(e) => setFilterResult(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Results</option>
                <option value="advice">First Aid</option>
                <option value="consult">Consult Doctor</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            {/* Severity Filter */}
            <div className="relative">
              <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Severity</option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center text-sm text-gray-600">
              Showing {filteredForms?.length} of {forms?.length} forms
            </div>
          </div>
        </div>

        {/* Forms List */}
        <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredForms?.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No forms found</h3>
              <p className="text-gray-600">
                {searchTerm || filterResult !== 'all' || filterSeverity !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No forms have been submitted yet.'
                }
              </p>
            </div>
          ) : (
            filteredForms?.map((form) => (
              <div
                key={form._id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex-1 flex-wrap">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="font-mono text-sm text-gray-500">
                      {form?.submissionId}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(form?.status)}`}>
                      {form?.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="font-medium text-gray-900">{form?.name}</div>
                        <div className="text-gray-500">{form?.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-gray-900">Submitted</div>
                        <div className="text-gray-500">{formatDate(form?.submittedAt)}</div>
                      </div>
                    </div>

                    <div className="flex items-center text-sm">
                      <Activity className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadge(form?.severity)}`}>
                          {form?.severity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-sm">
                      {getResultIcon(form?.result?.type)}
                      <div className="ml-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getResultBadge(form?.result?.type)}`}>
                          {form?.result?.type === 'advice' ? 'First Aid' :
                            form?.result?.type === 'consult' ? 'Consult Doctor' :
                              'Emergency'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Symptoms:</h4>
                    <div className="flex flex-wrap gap-2">
                      {form.symptoms.map((symptom, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">System Result:</h4>
                    <p className="text-sm text-gray-600">{form?.result?.title}</p>
                    {form?.result?.accuracy && (
                      <p className="text-xs text-gray-500 mt-1">
                        Accuracy: {Math.round(form?.result?.accuracy)}%
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Medicin:</h4>
                    {
                      form?.result?.medicin?.length > 0 ? (
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {form.result.medicin.map((med, idx) => (
                            <li key={idx}>
                              <span className="font-medium">{med.name}</span> - {med.dose}, {med.duration}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-600">No medicin recommended.</p>
                      )
                    }
                  </div>
                  <p className='mt-2'>{form?.result?.description}</p>
                  <hr className="my-4" />

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleViewDetails(form)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Details
                    </button>
                  </div>

                  {form.additionalInfo && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Information:</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{form.additionalInfo}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Modal */}
        {selectedForm && showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Form Details - {selectedForm?.submissionId}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* User Information */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Name:</label>
                          <p className="text-sm text-gray-900">{selectedForm?.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Email:</label>
                          <p className="text-sm text-gray-900">{selectedForm?.email}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Age:</label>
                            <p className="text-sm text-gray-900">{selectedForm?.age}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Gender:</label>
                            <p className="text-sm text-gray-900 capitalize">{selectedForm?.gender}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Symptoms & Details</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Symptoms:</label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedForm?.symptoms.map((symptom, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                              >
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Severity:</label>
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadge(selectedForm?.severity)}`}>
                              {selectedForm?.severity}
                            </span>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Duration:</label>
                            <p className="text-sm text-gray-900">{selectedForm?.duration.replace('-', ' ')}</p>
                          </div>
                        </div>
                        {selectedForm?.additionalInfo && (
                          <div>
                            <label className="text-sm font-medium text-gray-700">Additional Information:</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedForm?.additionalInfo}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedForm?.answerExtraQuestions && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Extra Questions</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Previous Experience:</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedForm?.extraQuestion1}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700">Medications & Allergies:</label>
                            <p className="text-sm text-gray-900 mt-1">{selectedForm?.extraQuestion2}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Editable System Result */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">System Result</h3>
                      <div className="p-4 rounded-lg border-l-4 border-gray-300 bg-gray-50">
                        <div className="flex items-center mb-2">
                          {getResultIcon(selectedForm?.result?.type)}
                          <h4 className="ml-2 font-semibold text-gray-900">{selectedForm?.result?.title}</h4>
                        </div>
                        <textarea
                          value={updatedDescription}
                          onChange={(e) => setUpdatedDescription(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Update description..."
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Medicin</h3>
                      <div className="space-y-2">
                        {updatedMedicin.map((med, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={med.name}
                              onChange={(e) => {
                                const newMedicin = [...updatedMedicin];
                                newMedicin[idx].name = e.target.value;
                                setUpdatedMedicin(newMedicin);
                              }}
                              className="w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Medicine name"
                            />
                            <input
                              type="text"
                              value={med.dose}
                              onChange={(e) => {
                                const newMedicin = [...updatedMedicin];
                                newMedicin[idx].dose = e.target.value;
                                setUpdatedMedicin(newMedicin);
                              }}
                              className="w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Dose"
                            />
                            <input
                              type="text"
                              value={med.duration}
                              onChange={(e) => {
                                const newMedicin = [...updatedMedicin];
                                newMedicin[idx].duration = e.target.value;
                                setUpdatedMedicin(newMedicin);
                              }}
                              className="w-1/3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Duration"
                            />
                            <button
                              onClick={() => {
                                const newMedicin = updatedMedicin.filter((_, i) => i !== idx);
                                setUpdatedMedicin(newMedicin);
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() =>
                            setUpdatedMedicin([...updatedMedicin, { name: '', dose: '', duration: '' }])
                          }
                          className="text-blue-500 hover:text-blue-700"
                        >
                          + Add Medicine
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateForm}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewForms;