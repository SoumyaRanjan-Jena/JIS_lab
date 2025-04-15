import React from 'react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Judiciary Information System
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Empowering transparency and justice through technology.
        </p>
      </header>
      <section className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <p className="mt-1 text-gray-500">
            {/* Quick overview of judicial data and case statistics. */}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <a href="/dashboard/view-cases">
            <h3 className="text-xl font-bold text-blue-800">Case Overview</h3>
            </a>
            <p className="mt-1 text-blue-600">
              Latest court cases and decisions.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-green-800">Statistics</h3>
            <p className="mt-1 text-green-600">
              Performance metrics and analysis.
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <a href = '/profile'>
            <h3 className="text-xl font-bold text-yellow-800">
              Compliance & Regulations
            </h3>
            </a>
            <p className="mt-1 text-yellow-600">
              Legislative updates and guidelines.
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-red-800">Alerts</h3>
            <p className="mt-1 text-red-600">
              System notifications and alerts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;