import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  AlertTriangle, 
  Phone, 
  FileText, 
  Clock,
  User,
  Activity,
  ArrowLeft,
  Download,
  Share
} from 'lucide-react';

const ResultPage = () => {
  const [submissionData, setSubmissionData] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('submissionData');
    if (!data) {
      navigate('/submit-form');
      return;
    }

    const submission = JSON.parse(data);
    setSubmissionData(submission);

    // Simulate AI matching logic
    const accuracy = calculateAccuracy(submission);
    const matchResult = generateResult(submission, accuracy);
    setResult(matchResult);

    // Save to history (in real app, this would be saved to backend)
    const history = JSON.parse(localStorage.getItem('submissionHistory') || '[]');
    history.unshift({
      id: submission.submissionId,
      ...submission,
      result: matchResult,
      accuracy
    });
    localStorage.setItem('submissionHistory', JSON.stringify(history.slice(0, 50))); // Keep last 50
  }, [navigate]);

  const calculateAccuracy = (submission) => {
    // Mock accuracy calculation based on symptoms and extra questions
    let baseAccuracy = 85;
    
    if (submission.answerExtraQuestions) {
      baseAccuracy = 90;
    }

    // Add some randomness to simulate real AI matching
    const variance = Math.random() * 10 - 5; // -5 to +5
    return Math.max(80, Math.min(95, baseAccuracy + variance));
  };

  const generateResult = (submission, accuracy) => {
    const { symptoms, severity } = submission;
    
    // Critical symptoms that require immediate medical attention
    const criticalSymptoms = ['chest pain', 'shortness of breath', 'severe allergic reaction'];
    const hasCriticalSymptoms = symptoms.some(symptom => 
      criticalSymptoms.some(critical => symptom.toLowerCase().includes(critical.toLowerCase()))
    );

    if (hasCriticalSymptoms || severity === 'critical') {
      return {
        type: 'emergency',
        title: 'Seek Immediate Medical Attention',
        description: 'Based on your symptoms, you should consult a doctor or visit an emergency room immediately.',
        instructions: [
          'Call emergency services (911) if symptoms are severe',
          'Go to the nearest emergency room',
          'Do not drive yourself - have someone else drive or call an ambulance',
          'Bring a list of your current medications'
        ],
        accuracy: null // Don't show accuracy for emergency cases
      };
    }

    // Check if accuracy meets threshold
    const threshold = submission.answerExtraQuestions ? 90 : 85;
    if (accuracy < threshold) {
      return {
        type: 'consult',
        title: 'Please Consult a Doctor',
        description: 'We could not find a strong match for your symptoms. It\'s best to consult with a healthcare professional.',
        instructions: [
          'Schedule an appointment with your primary care physician',
          'Prepare a list of all your symptoms and their duration',
          'Bring any relevant medical history',
          'Consider visiting an urgent care center if symptoms worsen'
        ],
        accuracy
      };
    }

    // Generate first aid advice based on symptoms
    return generateFirstAidAdvice(symptoms, accuracy);
  };

  const generateFirstAidAdvice = (symptoms, accuracy) => {
    // Mock first aid advice generation
    const adviceMap = {
      'headache': {
        title: 'Headache Relief',
        instructions: [
          'Rest in a quiet, dark room',
          'Apply a cold or warm compress to your head or neck',
          'Stay hydrated by drinking plenty of water',
          'Consider over-the-counter pain relievers if appropriate',
          'Avoid loud noises and bright lights'
        ]
      },
      'fever': {
        title: 'Fever Management',
        instructions: [
          'Get plenty of rest',
          'Drink lots of fluids to prevent dehydration',
          'Use a cool, damp washcloth on your forehead',
          'Take fever-reducing medication if recommended',
          'Monitor your temperature regularly'
        ]
      },
      'cuts': {
        title: 'Wound Care',
        instructions: [
          'Clean your hands thoroughly before treating the wound',
          'Stop any bleeding by applying direct pressure',
          'Clean the wound gently with water',
          'Apply an antibiotic ointment if available',
          'Cover with a sterile bandage'
        ]
      },
      'burns': {
        title: 'Burn Treatment',
        instructions: [
          'Cool the burn with cool (not cold) running water for 10-20 minutes',
          'Remove any jewelry or tight items before swelling begins',
          'Do not break blisters',
          'Apply a thin layer of aloe vera or moisturizer',
          'Cover with a sterile, non-adhesive bandage'
        ]
      }
    };

    // Find the most relevant advice
    for (const symptom of symptoms) {
      for (const [key, advice] of Object.entries(adviceMap)) {
        if (symptom.toLowerCase().includes(key)) {
          return {
            type: 'advice',
            title: advice.title,
            description: 'Based on your symptoms, here are the recommended first-aid steps:',
            instructions: advice.instructions,
            accuracy
          };
        }
      }
    }

    // Default advice
    return {
      type: 'advice',
      title: 'General First Aid Guidance',
      description: 'Based on your symptoms, here are some general recommendations:',
      instructions: [
        'Monitor your symptoms closely',
        'Get adequate rest and stay hydrated',
        'Avoid strenuous activities',
        'Consider over-the-counter remedies if appropriate',
        'Seek medical attention if symptoms worsen or persist'
      ],
      accuracy
    };
  };

  if (!submissionData || !result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getResultIcon = () => {
    switch (result.type) {
      case 'emergency':
        return <AlertTriangle className="h-12 w-12 text-red-600" />;
      case 'consult':
        return <Phone className="h-12 w-12 text-orange-600" />;
      default:
        return <CheckCircle className="h-12 w-12 text-green-600" />;
    }
  };

  const getResultColor = () => {
    switch (result.type) {
      case 'emergency':
        return 'red';
      case 'consult':
        return 'orange';
      default:
        return 'green';
    }
  };

  const color = getResultColor();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Results</h1>
          <p className="text-gray-600">
            Based on the information you provided, here's our recommendation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Result */}
          <div className="lg:col-span-2">
            <div className={`bg-white rounded-xl shadow-sm p-8 border-l-4 ${
              color === 'red' ? 'border-red-500' :
              color === 'orange' ? 'border-orange-500' :
              'border-green-500'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getResultIcon()}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {result.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {result.description}
                  </p>

                  {result.accuracy && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Match Accuracy</span>
                        <span className="text-sm font-bold text-gray-900">
                          {Math.round(result.accuracy)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            result.accuracy >= 90 ? 'bg-green-500' :
                            result.accuracy >= 85 ? 'bg-blue-500' :
                            'bg-orange-500'
                          }`}
                          style={{ width: `${result.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Recommended Actions:
                    </h3>
                    <ul className="space-y-3">
                      {result.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium text-white mr-3 mt-0.5 ${
                            color === 'red' ? 'bg-red-500' :
                            color === 'orange' ? 'bg-orange-500' :
                            'bg-green-500'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {result.type === 'emergency' && (
                    <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-red-600 mr-2" />
                        <span className="font-semibold text-red-900">Emergency: 911</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Share className="h-4 w-4 mr-2" />
                Share Results
              </button>
              <Link
                to="/submit-form"
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileText className="h-4 w-4 mr-2" />
                Submit New Form
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submission Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Submission Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Patient:</span>
                  <span className="ml-2 font-medium">{submissionData.name}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Submitted:</span>
                  <span className="ml-2 font-medium">
                    {new Date(submissionData.submittedAt).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Activity className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Severity:</span>
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    submissionData.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    submissionData.severity === 'severe' ? 'bg-orange-100 text-orange-800' :
                    submissionData.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {submissionData.severity}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Symptoms:</h4>
                <div className="flex flex-wrap gap-1">
                  {submissionData.symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">Important Disclaimer</h3>
              <p className="text-yellow-800 text-sm">
                This guidance is for informational purposes only and should not replace 
                professional medical advice. Always consult with a healthcare provider 
                for serious medical concerns.
              </p>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">What's Next?</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Monitor your symptoms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Follow the recommended actions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Seek medical help if symptoms worsen</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Keep this report for your records</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;