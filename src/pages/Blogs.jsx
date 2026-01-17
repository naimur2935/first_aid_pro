import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Heart, Shield, Zap } from 'lucide-react';

const Blogs = () => {
  const featuredPost = {
    id: 1,
    title: 'Essential First Aid Skills Everyone Should Know',
    excerpt: 'Learn the fundamental first aid techniques that could save a life in an emergency situation. From CPR to wound care, discover what you need to know.',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Dr. Sarah Mitchell',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Emergency Care'
  };

  const blogPosts = [
    {
      id: 2,
      title: 'How to Perform CPR: A Step-by-Step Guide',
      excerpt: 'CPR can double or triple a person\'s chance of survival. Learn the proper technique and when to use it.',
      image: 'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Dr. Michael Chen',
      date: '2025-01-10',
      readTime: '6 min read',
      category: 'CPR'
    },
    {
      id: 3,
      title: 'Treating Cuts and Wounds at Home',
      excerpt: 'Not all cuts require a trip to the hospital. Learn how to properly clean and dress wounds at home.',
      image: 'https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Lisa Thompson',
      date: '2025-01-08',
      readTime: '5 min read',
      category: 'Wound Care'
    },
    {
      id: 4,
      title: 'Recognizing Signs of a Heart Attack',
      excerpt: 'Early recognition of heart attack symptoms can save lives. Know what to look for and how to respond.',
      image: 'https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Dr. Sarah Mitchell',
      date: '2025-01-05',
      readTime: '7 min read',
      category: 'Heart Health'
    },
    {
      id: 5,
      title: 'Building a Complete First Aid Kit',
      excerpt: 'Every home should have a well-stocked first aid kit. Here\'s what you need to include and why.',
      image: 'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'James Rodriguez',
      date: '2025-01-03',
      readTime: '4 min read',
      category: 'Preparation'
    },
    {
      id: 6,
      title: 'Emergency Response for Allergic Reactions',
      excerpt: 'Allergic reactions can escalate quickly. Learn how to identify and respond to severe allergic reactions.',
      image: 'https://images.pexels.com/photos/4386447/pexels-photo-4386447.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Dr. Michael Chen',
      date: '2025-01-01',
      readTime: '6 min read',
      category: 'Allergies'
    },
    {
      id: 7,
      title: 'First Aid for Burns: What You Need to Know',
      excerpt: 'Burns can happen anywhere. Learn how to assess severity and provide immediate care for different types of burns.',
      image: 'https://images.pexels.com/photos/4386444/pexels-photo-4386444.jpeg?auto=compress&cs=tinysrgb&w=400',
      author: 'Lisa Thompson',
      date: '2024-12-28',
      readTime: '5 min read',
      category: 'Burn Care'
    }
  ];

  const categories = [
    { name: 'All Posts', count: 7, active: true },
    { name: 'Emergency Care', count: 2, active: false },
    { name: 'CPR', count: 1, active: false },
    { name: 'Wound Care', count: 2, active: false },
    { name: 'Heart Health', count: 1, active: false },
    { name: 'Preparation', count: 1, active: false }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Health & First Aid Blog
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Expert advice, tips, and insights to help you stay prepared 
            for any health emergency.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Categories</h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        category.active
                          ? 'bg-blue-100 text-blue-800 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="float-right text-sm">({category.count})</span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* Newsletter Signup */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Stay Updated</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest health tips and first aid advice delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      <span className="mr-4">{featuredPost.author}</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(featuredPost.date)}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        <span className="mr-4">{post.author}</span>
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      
                      <button className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                        Read
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                Load More Articles
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Professional Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            While our blog provides valuable information, nothing replaces 
            professional medical advice when you need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Join FirstAid Pro
            </Link>
            <Link
              to="/packages"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;