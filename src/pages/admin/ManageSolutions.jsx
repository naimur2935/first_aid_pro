import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Tag,
  FileText
} from 'lucide-react';

const ManageSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSolution, setEditingSolution] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    keywords: '',
    treatment: '',
    severity: 'mild',
    category: ''
  });
  const [errors, setErrors] = useState({});

  // Mock solutions data
  useEffect(() => {
    const mockSolutions = [
      {
        id: 1,
        name: 'Headache Relief',
        keywords: ['headache', 'head pain', 'migraine', 'tension headache'],
        treatment: 'Rest in a quiet, dark room. Apply a cold or warm compress to your head or neck. Stay hydrated by drinking plenty of water. Consider over-the-counter pain relievers if appropriate.',
        severity: 'mild',
        category: 'Pain Management',
        createdAt: '2024-12-01',
        updatedAt: '2025-01-10'
      },
      {
        id: 2,
        name: 'Fever Management',
        keywords: ['fever', 'high temperature', 'hot', 'chills'],
        treatment: 'Get plenty of rest. Drink lots of fluids to prevent dehydration. Use a cool, damp washcloth on your forehead. Take fever-reducing medication if recommended. Monitor your temperature regularly.',
        severity: 'moderate',
        category: 'General Care',
        createdAt: '2024-11-15',
        updatedAt: '2025-01-05'
      },
      {
        id: 3,
        name: 'Minor Cut Treatment',
        keywords: ['cut', 'wound', 'bleeding', 'laceration', 'scrape'],
        treatment: 'Clean your hands thoroughly before treating the wound. Stop any bleeding by applying direct pressure. Clean the wound gently with water. Apply an antibiotic ointment if available. Cover with a sterile bandage.',
        severity: 'mild',
        category: 'Wound Care',
        createdAt: '2024-10-20',
        updatedAt: '2024-12-15'
      },
      {
        id: 4,
        name: 'Burn Treatment',
        keywords: ['burn', 'burned', 'scalded', 'hot water', 'fire'],
        treatment: 'Cool the burn with cool (not cold) running water for 10-20 minutes. Remove any jewelry or tight items before swelling begins. Do not break blisters. Apply a thin layer of aloe vera or moisturizer. Cover with a sterile, non-adhesive bandage.',
        severity: 'moderate',
        category: 'Wound Care',
        createdAt: '2024-09-10',
        updatedAt: '2024-11-20'
      },
      {
        id: 5,
        name: 'Allergic Reaction',
        keywords: ['allergy', 'allergic reaction', 'rash', 'hives', 'swelling'],
        treatment: 'Remove or avoid the allergen if known. Take an antihistamine if available. Apply cool compresses to affected areas. For severe reactions with difficulty breathing, seek immediate medical attention.',
        severity: 'severe',
        category: 'Emergency Care',
        createdAt: '2024-08-05',
        updatedAt: '2024-10-30'
      }
    ];
    setSolutions(mockSolutions);
    setFilteredSolutions(mockSolutions);
  }, []);

  // Filter solutions based on search
  useEffect(() => {
    if (searchTerm) {
      const filtered = solutions.filter(solution =>
        solution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        solution.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        solution.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSolutions(filtered);
    } else {
      setFilteredSolutions(solutions);
    }
  }, [solutions, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Solution name is required';
    if (!formData.keywords.trim()) newErrors.keywords = 'Keywords are required';
    if (!formData.treatment.trim()) newErrors.treatment = 'Treatment description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const keywordsArray = formData.keywords.split(',').map(k => k.trim()).filter(k => k);
    
    if (editingSolution) {
      // Update existing solution
      setSolutions(prev => prev.map(solution =>
        solution.id === editingSolution.id
          ? {
              ...solution,
              ...formData,
              keywords: keywordsArray,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : solution
      ));
    } else {
      // Add new solution
      const newSolution = {
        id: Date.now(),
        ...formData,
        keywords: keywordsArray,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setSolutions(prev => [newSolution, ...prev]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      keywords: '',
      treatment: '',
      severity: 'mild',
      category: ''
    });
    setErrors({});
    setShowAddModal(false);
    setEditingSolution(null);
  };

  const handleEdit = (solution) => {
    setEditingSolution(solution);
    setFormData({
      name: solution.name,
      keywords: solution.keywords.join(', '),
      treatment: solution.treatment,
      severity: solution.severity,
      category: solution.category
    });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this solution?')) {
      setSolutions(prev => prev.filter(solution => solution.id !== id));
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'severe':
        return 'bg-red-100 text-red-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'mild':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = [...new Set(solutions.map(s => s.category))];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Health Solutions</h1>
              <p className="text-gray-600">
                Add, edit, and manage first-aid solutions and their matching keywords.
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Solution
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Solutions</p>
                <p className="text-2xl font-bold text-gray-900">{solutions.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
              <Tag className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mild Cases</p>
                <p className="text-2xl font-bold text-gray-900">
                  {solutions.filter(s => s.severity === 'mild').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Severe Cases</p>
                <p className="text-2xl font-bold text-gray-900">
                  {solutions.filter(s => s.severity === 'severe').length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search solutions, keywords, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSolutions.map((solution) => (
            <div key={solution.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {solution.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityBadge(solution.severity)}`}>
                      {solution.severity}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {solution.category}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(solution)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(solution.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Keywords:</h4>
                <div className="flex flex-wrap gap-1">
                  {solution.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Treatment:</h4>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {solution.treatment}
                </p>
              </div>

              <div className="text-xs text-gray-500">
                Updated: {new Date(solution.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {filteredSolutions.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No solutions found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? 'Try adjusting your search criteria.'
                : 'Start by adding your first health solution.'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Solution
              </button>
            )}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingSolution ? 'Edit Solution' : 'Add New Solution'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Solution Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Headache Relief"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.category ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="e.g., Pain Management"
                      />
                      {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Severity *
                      </label>
                      <select
                        name="severity"
                        value={formData.severity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="mild">Mild</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keywords * (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.keywords ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="e.g., headache, head pain, migraine, tension headache"
                    />
                    {errors.keywords && <p className="mt-1 text-sm text-red-600">{errors.keywords}</p>}
                    <p className="mt-1 text-sm text-gray-500">
                      Enter keywords that users might search for, separated by commas
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Treatment Instructions *
                    </label>
                    <textarea
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleInputChange}
                      rows="6"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                        errors.treatment ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Provide detailed step-by-step treatment instructions..."
                    />
                    {errors.treatment && <p className="mt-1 text-sm text-red-600">{errors.treatment}</p>}
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingSolution ? 'Update Solution' : 'Add Solution'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSolutions;