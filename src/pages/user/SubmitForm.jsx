import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  ArrowRight,
  Plus,
  X
} from 'lucide-react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const SubmitForm = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: '',
    gender: '',
    symptoms: [],
    customSymptom: '',
    severity: '',
    duration: '',
    additionalInfo: '',
    answerExtraQuestions: false,
    extraQuestion1: '',
    extraQuestion2: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Sore throat', 'Nausea', 'Vomiting',
    'Diarrhea', 'Chest pain', 'Shortness of breath', 'Dizziness',
    'Fatigue', 'Muscle pain', 'Joint pain', 'Rash', 'Abdominal pain',
    'Back pain', 'Cuts/Wounds', 'Burns', 'Sprains', 'Allergic reaction'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSymptomToggle = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const addCustomSymptom = () => {
    if (formData.customSymptom.trim() && !formData.symptoms.includes(formData.customSymptom.trim())) {
      setFormData(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, prev.customSymptom.trim()],
        customSymptom: ''
      }));
    }
  };

  const removeSymptom = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter(s => s !== symptom)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (formData.symptoms.length === 0) newErrors.symptoms = 'Please select at least one symptom';
    if (!formData.severity) newErrors.severity = 'Severity is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';

    if (formData.answerExtraQuestions) {
      if (!formData.extraQuestion1.trim()) newErrors.extraQuestion1 = 'Please answer this question';
      if (!formData.extraQuestion2.trim()) newErrors.extraQuestion2 = 'Please answer this question';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const submissionData = {
      userId: user.id,
      ...formData,
      submittedAt: new Date()
    };
    const res = await axiosPublic.post('/cases', submissionData);
    if(!res?.data?.insertedId){
      alert('Failed to submit the form. Please try again.');
      setLoading(false);
      return;
    }
    setLoading(false);
    alert('Form submitted successfully!');
    navigate('/result');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit Symptoms</h1>
          <p className="text-gray-600">
            Provide detailed information about your symptoms to get accurate first-aid guidance.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="1"
                  max="120"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.age ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your age"
                />
                {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.gender ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Symptoms</h2>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select your symptoms *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`p-3 text-sm rounded-lg border transition-colors ${
                      formData.symptoms.includes(symptom)
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {symptom}
                  </button>
                ))}
              </div>

              {/* Custom Symptom Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={formData.customSymptom}
                  onChange={(e) => setFormData(prev => ({ ...prev, customSymptom: e.target.value }))}
                  placeholder="Add custom symptom"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addCustomSymptom}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Selected Symptoms */}
              {formData.symptoms.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Selected symptoms:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.symptoms.map((symptom) => (
                      <span
                        key={symptom}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {symptom}
                        <button
                          type="button"
                          onClick={() => removeSymptom(symptom)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {errors.symptoms && <p className="text-sm text-red-600">{errors.symptoms}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity *
                </label>
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.severity ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select severity</option>
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                  <option value="critical">Critical</option>
                </select>
                {errors.severity && <p className="mt-1 text-sm text-red-600">{errors.severity}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.duration ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select duration</option>
                  <option value="less-than-hour">Less than 1 hour</option>
                  <option value="1-6-hours">1-6 hours</option>
                  <option value="6-24-hours">6-24 hours</option>
                  <option value="1-3-days">1-3 days</option>
                  <option value="more-than-3-days">More than 3 days</option>
                </select>
                {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Provide any additional details about your symptoms, medical history, or current medications..."
              />
            </div>
          </div>

          {/* Extra Questions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">Enhanced Accuracy</h2>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="answerExtraQuestions"
                  name="answerExtraQuestions"
                  checked={formData.answerExtraQuestions}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="answerExtraQuestions" className="ml-2 text-sm text-gray-700">
                  Answer 2 extra questions for 90% accuracy (vs 85%)
                </label>
              </div>
            </div>

            {formData.answerExtraQuestions && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Have you experienced these symptoms before? *
                  </label>
                  <textarea
                    name="extraQuestion1"
                    value={formData.extraQuestion1}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      errors.extraQuestion1 ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Please describe any previous experiences with similar symptoms..."
                  />
                  {errors.extraQuestion1 && <p className="mt-1 text-sm text-red-600">{errors.extraQuestion1}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Are you currently taking any medications or have any allergies? *
                  </label>
                  <textarea
                    name="extraQuestion2"
                    value={formData.extraQuestion2}
                    onChange={handleInputChange}
                    rows="3"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      errors.extraQuestion2 ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="List any medications, supplements, or known allergies..."
                  />
                  {errors.extraQuestion2 && <p className="mt-1 text-sm text-red-600">{errors.extraQuestion2}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center ${
                loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  Submit Form
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitForm;