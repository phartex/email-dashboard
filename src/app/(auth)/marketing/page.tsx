"use client";

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, CheckCircle } from 'lucide-react';

type TimeFilter = '7days' | '14days' | '1month';

interface MetricData {
  totalSpend: { current: number; previous: number; progress: number };
  visitors: { current: number; previous: number; progress: number };
  acquisition: { current: number; previous: number; progress: number };
  revenue: { current: number; previous: number; progress: number };
}

const MarketingPage = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7days');

  // Mock data for different time periods
  const mockData: Record<TimeFilter, MetricData> = {
    '7days': {
      totalSpend: { current: 8765, previous: 10234, progress: -14.32 },
      visitors: { current: 14321, previous: 12543, progress: 14.23 },
      acquisition: { current: 1023, previous: 876, progress: 16.73 },
      revenue: { current: 18765, previous: 15432, progress: 21.67 }
    },
    '14days': {
      totalSpend: { current: 16420, previous: 18900, progress: -13.12 },
      visitors: { current: 27845, previous: 23100, progress: 20.54 },
      acquisition: { current: 1950, previous: 1620, progress: 20.37 },
      revenue: { current: 35200, previous: 28900, progress: 21.80 }
    },
    '1month': {
      totalSpend: { current: 32100, previous: 35600, progress: -9.83 },
      visitors: { current: 52340, previous: 44200, progress: 18.42 },
      acquisition: { current: 3780, previous: 3100, progress: 21.94 },
      revenue: { current: 68500, previous: 55300, progress: 23.87 }
    }
  };

  const currentData = mockData[timeFilter];

  // Mock chart data
  const trafficData = [
    { name: 'March 1', value1: 120, value2: 40 },
    { name: 'March 2', value1: 90, value2: 30 },
    { name: 'March 3', value1: 100, value2: 40 },
    { name: 'March 4', value1: 180, value2: 20 },
    { name: 'March 5', value1: 140, value2: 20 },
    { name: 'March 6', value1: 120, value2: 30 },
    { name: 'March 7', value1: 110, value2: 30 }
  ];

  const acquisitionData = [
    { date: 'March 1', acquisitions: 200, cost: 1000 },
    { date: 'March 2', acquisitions: 250, cost: 1500 },
    { date: 'March 3', acquisitions: 300, cost: 2000 },
    { date: 'March 4', acquisitions: 500, cost: 3000 },
    { date: 'March 5', acquisitions: 450, cost: 2500 },
    { date: 'March 6', acquisitions: 550, cost: 4000 },
    { date: 'March 7', acquisitions: 400, cost: 2000 }
  ];

  const platforms = [
    { name: 'Facebook', remaining: 12345, percentage: 60, color: 'bg-green-500' },
    { name: 'X', remaining: 1543, percentage: 86, color: 'bg-green-500' },
    { name: 'Google', remaining: 5678, percentage: 67, color: 'bg-green-500' },
    { name: 'TikTok', remaining: 3456, percentage: 21, color: 'bg-red-500' },
    { name: 'Bing', remaining: 2098, percentage: 35, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Marketing</h1>
        <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm border border-black">
          <button
            onClick={() => setTimeFilter('7days')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeFilter === '7days'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeFilter('14days')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeFilter === '14days'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            14 Days
          </button>
          <button
            onClick={() => setTimeFilter('1month')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeFilter === '1month'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            1 Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Metrics */}
        <div className="space-y-6">
          {/* Total Spend */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-black">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Spend</p>
                <h2 className="text-3xl font-bold text-gray-900">
                  ${currentData.totalSpend.current.toLocaleString()}
                </h2>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs mt-3">
              <span className="text-gray-500">
                Previous ${currentData.totalSpend.previous.toLocaleString()}
              </span>
              <span className="text-red-600 font-medium flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                {currentData.totalSpend.progress}%
              </span>
            </div>
          </div>

          {/* Acquisition */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-black">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-600 mb-1">Acquisition</p>
                <h2 className="text-3xl font-bold text-gray-900">
                  {currentData.acquisition.current.toLocaleString()}
                </h2>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs mt-3">
              <span className="text-gray-500">
                Previous {currentData.acquisition.previous.toLocaleString()}
              </span>
              <span className="text-green-600 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +{currentData.acquisition.progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Middle Column - Metrics */}
        <div className="space-y-6">
          {/* Visitor */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-black">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-600 mb-1">Visitor</p>
                <h2 className="text-3xl font-bold text-gray-900">
                  {currentData.visitors.current.toLocaleString()}
                </h2>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs mt-3">
              <span className="text-gray-500">
                Previous {currentData.visitors.previous.toLocaleString()}
              </span>
              <span className="text-green-600 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +{currentData.visitors.progress}%
              </span>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-black">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-600 mb-1">Revenue</p>
                <h2 className="text-3xl font-bold text-gray-900">
                  ${currentData.revenue.current.toLocaleString()}
                </h2>
              </div>
              <div className="bg-green-50 p-2 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="flex justify-between items-center text-xs mt-3">
              <span className="text-gray-500">
                Previous ${currentData.revenue.previous.toLocaleString()}
              </span>
              <span className="text-green-600 font-medium flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +{currentData.revenue.progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Acquisition vs Cost Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-black">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Acquisition vs Cost</h3>
          <div className="relative h-64">
            <svg width="100%" height="100%" viewBox="0 0 400 200">
              {/* Y-axis labels */}
              <text x="5" y="15" className="text-xs fill-gray-400">800</text>
              <text x="5" y="55" className="text-xs fill-gray-400">700</text>
              <text x="5" y="95" className="text-xs fill-gray-400">600</text>
              <text x="5" y="135" className="text-xs fill-gray-400">500</text>
              <text x="5" y="175" className="text-xs fill-gray-400">400</text>
              
              {/* Right Y-axis labels */}
              <text x="370" y="15" className="text-xs fill-gray-400">6000$</text>
              <text x="370" y="55" className="text-xs fill-gray-400">5000$</text>
              <text x="370" y="95" className="text-xs fill-gray-400">4000$</text>
              <text x="370" y="135" className="text-xs fill-gray-400">3000$</text>
              <text x="370" y="175" className="text-xs fill-gray-400">2000$</text>

              {/* Blue line (Cost) */}
              <polyline
                points="40,130 90,170 140,150 190,100 240,180 290,90 340,140"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
              />
              
              {/* Green line (Acquisitions) */}
              <polyline
                points="40,160 90,150 140,130 190,100 240,110 290,120 340,140"
                fill="none"
                stroke="#22C55E"
                strokeWidth="3"
              />

              {/* X-axis labels */}
              {acquisitionData.map((item, i) => (
                <text key={i} x={40 + i * 50} y="195" className="text-xs fill-gray-400">
                  {item.date.replace('March ', '')}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Traffic Source */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-black">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Traffic Source</h3>
          <div className="h-64">
            <svg width="100%" height="100%" viewBox="0 0 500 220">
              {trafficData.map((item, i) => {
                const x = 50 + i * 70;
                const height1 = item.value1;
                const height2 = item.value2;
                return (
                  <g key={i}>
                    <rect x={x} y={200 - height1} width="50" height={height1} fill="#86EFAC" />
                    <rect x={x} y={200 - height1 - height2} width="50" height={height2} fill="#D4F4DD" />
                    <text x={x + 10} y="218" className="text-xs text-black fill-gray-600">March {item.name.replace('March ', '')}</text>
                  </g>
                );
              })}
              
              {/* Y-axis labels */}
              {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((val, i) => (
                <text key={i} x="5" y={200 - val + 5} className="text-xs fill-gray-400">{val}</text>
              ))}
            </svg>
          </div>
        </div>

        {/* Budget by Platform */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-black">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Budget by Platform</h3>
          <div className="space-y-4">
            {platforms.map((platform, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {platform.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">
                      Remaining: ${platform.remaining.toLocaleString()}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">{platform.percentage}%</span>
                  </div>
                  <div className="w-full bg-black rounded-full h-2">
                    <div
                      className={`${platform.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${platform.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;