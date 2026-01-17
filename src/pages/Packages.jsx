import React, { useState } from 'react';
import { Check, X, Star, Users, Zap, Crown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Packages = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [loading, setLoading] = useState(false);

  const packages = [
    {
      name: 'Free',
      icon: <Users className="h-8 w-8" />,
      description: 'Perfect for trying out our platform',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { text: '1 form submission per day', included: true },
        { text: 'Basic first-aid advice', included: true },
        { text: 'Community support', included: true },
        { text: 'Email support', included: false },
        { text: 'Priority matching', included: false },
        { text: 'History tracking', included: false },
        { text: 'Doctor consultation', included: false },
        { text: 'Family accounts', included: false }
      ],
      popular: false,
      color: 'gray'
    },
    {
      name: 'Standard',
      icon: <Zap className="h-8 w-8" />,
      description: 'Most popular choice for regular users',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: [
        { text: 'Unlimited form submissions', included: true },
        { text: 'Advanced AI matching (90% accuracy)', included: true },
        { text: 'Priority support', included: true },
        { text: 'Email & chat support', included: true },
        { text: 'Complete history tracking', included: true },
        { text: 'Mobile app access', included: true },
        { text: 'Doctor consultation', included: false },
        { text: 'Family accounts', included: false }
      ],
      popular: true,
      color: 'blue'
    },
    {
      name: 'Premium',
      icon: <Crown className="h-8 w-8" />,
      description: 'Complete healthcare solution for families',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        { text: 'All Standard features', included: true },
        { text: 'Personal doctor consultation', included: true },
        { text: '24/7 emergency support', included: true },
        { text: 'Family account (up to 5 members)', included: true },
        { text: 'Personalized health insights', included: true },
        { text: 'Telehealth integration', included: true },
        { text: 'Health record storage', included: true },
        { text: 'Premium mobile features', included: true }
      ],
      popular: false,
      color: 'purple'
    }
  ];

  const getPrice = (pkg) => {
    return billingPeriod === 'monthly' ? pkg.monthlyPrice : pkg.yearlyPrice;
  };

  const getColorClasses = (color, popular = false) => {
    const colors = {
      gray: popular
        ? 'ring-2 ring-gray-500 bg-gray-50'
        : 'border border-gray-200',
      blue: popular
        ? 'ring-2 ring-blue-500 bg-blue-50'
        : 'border border-blue-200',
      purple: popular
        ? 'ring-2 ring-purple-500 bg-purple-50'
        : 'border border-purple-200'
    };
    return colors[color] || colors.gray;
  };

  const getButtonClasses = (color, popular = false) => {
    const colors = {
      gray: 'bg-gray-600 hover:bg-gray-700 text-white',
      blue: 'bg-blue-600 hover:bg-blue-700 text-white',
      purple: 'bg-purple-600 hover:purple-700 text-white'
    };
    return colors[color] || colors.gray;
  };

  const handelPay = (amount, pack) => {
    setLoading(true);
    axiosPublic.post('/payments', { totalAmount: amount, email: user.email, package: pack}).then((res) => {
      if (res?.data?.url) {
        window.location.href = res?.data?.url;
        setLoading(false)
      }
    }).catch((err) => {
      setLoading(false);
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Select the perfect package for your health and safety needs.
            All plans include our core first-aid guidance system.
          </p>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${billingPeriod === 'monthly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${billingPeriod === 'yearly'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                  }`}
              >
                Yearly
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-xl p-8 relative ${getColorClasses(pkg.color, pkg.popular)}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Package Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${pkg.color === 'gray' ? 'bg-gray-100 text-gray-600' :
                      pkg.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                    }`}>
                    {pkg.icon}
                  </div>
                  <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${user?.package === pkg.name ? 'text-blue-600' : ''}`}>{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>

                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${getPrice(pkg)}
                    </span>
                    <span className="text-gray-600 ml-1">
                      /{billingPeriod === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  onClick={() => {
                    if(user){
                      pkg.monthlyPrice === 0 ? navigate('/submit-form') : handelPay(getPrice(pkg), pkg.name)
                    }else{
                      navigate('/login')
                    }
                  }}
                  className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${getButtonClasses(pkg.color)}`}>
                  {/* add loading here*/}
                  {
                    loading ?
                    <p className='text-white'>Proccecing...</p>
                    :
                    <p>
                      {
                      pkg.monthlyPrice === 0 ? 'Start Free' : 'Get Started'
                      }
                    </p>
                  }
                </button>
                <Link
                  to="/register"
                >

                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our packages
            </p>
          </div>

          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I switch plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect
                immediately and we'll prorate the billing accordingly.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What happens when I exceed my daily limit on the Free plan?
              </h3>
              <p className="text-gray-600">
                On the Free plan, you can submit 1 form per day. After reaching this limit,
                you'll be prompted to upgrade to continue using the service.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                How accurate is the AI matching system?
              </h3>
              <p className="text-gray-600">
                Our AI system achieves 85-90% accuracy in matching symptoms to appropriate
                first-aid solutions. Premium users benefit from enhanced accuracy with additional questions.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What's included in doctor consultation?
              </h3>
              <p className="text-gray-600">
                Premium users get access to licensed healthcare professionals via video chat,
                phone calls, or text messaging for medical advice and consultation.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is there a money-back guarantee?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee on all paid plans.
                If you're not satisfied, contact our support team for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Health Journey Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust FirstAid Pro for their emergency preparedness.
            Choose the plan that's right for you.
          </p>
          <Link
            to="/register"
            className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 inline-block"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Packages;