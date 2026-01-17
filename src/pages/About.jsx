import React from 'react';
import { Heart, Target, Eye, Users, Award, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Users Helped', value: '50,000+', icon: <Users className="h-6 w-6" /> },
    { label: 'Success Rate', value: '98%', icon: <Award className="h-6 w-6" /> },
    { label: 'Response Time', value: '<30s', icon: <Clock className="h-6 w-6" /> },
    { label: 'Medical Partners', value: '200+', icon: <Heart className="h-6 w-6" /> }
  ];

  const team = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Chief Medical Officer',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: '15+ years in emergency medicine'
    },
    {
      name: 'James Rodriguez',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Healthcare technology innovator'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'AI Research Director',
      image: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Expert in medical AI systems'
    },
    {
      name: 'Lisa Thompson',
      role: 'Head of Patient Care',
      image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Patient advocacy specialist'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About FirstAid Pro
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
              We're on a mission to make emergency medical guidance accessible to everyone, 
              anywhere, at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-12">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To democratize access to life-saving first-aid information by leveraging 
                  cutting-edge AI technology. We believe that everyone deserves immediate 
                  access to accurate medical guidance during emergencies.
                </p>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To create a world where no one feels helpless during a medical emergency. 
                  We envision a future where AI-powered first aid guidance is as common 
                  as having a first-aid kit in your home.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Medical team"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-blue-600 opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Real numbers that show our commitment to saving lives
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why First Aid is Important */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why First Aid Matters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-red-50 p-8 rounded-xl border border-red-100">
              <h3 className="text-xl font-bold text-red-900 mb-4">Saves Lives</h3>
              <p className="text-red-800">
                Immediate first aid can mean the difference between life and death. 
                Quick response in the first few minutes is crucial for survival.
              </p>
            </div>

            <div className="bg-yellow-50 p-8 rounded-xl border border-yellow-100">
              <h3 className="text-xl font-bold text-yellow-900 mb-4">Prevents Worsening</h3>
              <p className="text-yellow-800">
                Proper first aid prevents injuries and medical conditions from 
                becoming more severe before professional help arrives.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-xl border border-green-100">
              <h3 className="text-xl font-bold text-green-900 mb-4">Faster Recovery</h3>
              <p className="text-green-800">
                Quick and proper first aid treatment often leads to faster 
                healing and better long-term outcomes for patients.
              </p>
            </div>

            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Peace of Mind</h3>
              <p className="text-blue-800">
                Knowing you can help in an emergency gives confidence and 
                peace of mind to you and your loved ones.
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-xl border border-purple-100">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Legal Protection</h3>
              <p className="text-purple-800">
                Many countries have Good Samaritan laws that protect those 
                who provide first aid in emergency situations.
              </p>
            </div>

            <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Community Impact</h3>
              <p className="text-indigo-800">
                When more people know first aid, the entire community becomes 
                safer and more resilient in emergencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Healthcare professionals and technology experts working together
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Us in Saving Lives
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of a community that's committed to making emergency medical 
            guidance accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Get Started Today
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;