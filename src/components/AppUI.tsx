import { motion } from 'framer-motion'

interface AppUIProps {
  screen: 'map' | 'trips' | 'details' | 'itinerary'
}

export default function AppUI({ screen }: AppUIProps) {
  const renderMapScreen = () => (
    <div className="h-full w-full bg-[#1a1a2e] text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-black/20">
        <span>4:59</span>
        <div className="flex items-center gap-2">
          <span>▲▲▲</span>
          <span>Wi-Fi</span>
          <span>34%</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full bg-black/20">←</button>
          <div className="flex-1 bg-white/10 rounded-full px-4 py-2">
            <span className="text-white/60">Tokyo Station Yaesu...</span>
          </div>
          <button className="p-2 rounded-full bg-black/20">
            <span className="text-xl">💬</span>
          </button>
        </div>
      </div>

      {/* Map View */}
      <div className="relative h-[calc(100%-160px)]">
        <div className="absolute inset-0 bg-blue-900/30">
          {/* Simulated Map */}
          <div className="h-full w-full bg-gradient-to-b from-blue-400/20 to-green-400/20">
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#FFD700] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-[#FFD700] rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full" />
            {/* Route Line */}
            <div className="absolute top-1/4 left-1/4 bottom-1/4 right-1/4 border-t-2 border-[#FFD700] transform rotate-45" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute left-4 top-4 flex flex-col gap-4">
          <button className="p-3 rounded-full bg-white/10 backdrop-blur-lg">🎯</button>
          <button className="p-3 rounded-full bg-white/10 backdrop-blur-lg">🌤️</button>
          <button className="p-3 rounded-full bg-white/10 backdrop-blur-lg">🔍</button>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">San Francisco Trip</h3>
            <p className="text-sm text-white/70">9 activities • 5 days</p>
          </div>
          <span className="text-[#FFD700]">$750</span>
        </div>
        <div className="mt-4 flex justify-between gap-4">
          <button className="flex-1 py-2 px-4 bg-black/30 rounded-full">Navigate</button>
          <button className="flex-1 py-2 px-4 bg-[#FFD700] text-black rounded-full">Publish Trip</button>
        </div>
      </div>
    </div>
  )

  const renderTripsScreen = () => (
    <div className="h-full w-full bg-black text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2">
        <span>4:59</span>
        <div className="flex items-center gap-2">
          <span>▲▲▲</span>
          <span>Wi-Fi</span>
          <span>34%</span>
        </div>
      </div>

      {/* Header */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Trips</h1>
        <div className="bg-white/10 rounded-full px-4 py-2 mb-4">
          <span className="text-white/60">Search trips</span>
        </div>
        <div className="flex gap-4 mb-4">
          <button className="px-4 py-1 rounded-full bg-white text-black">All</button>
          <button className="px-4 py-1">Upcoming</button>
          <button className="px-4 py-1">Drafts</button>
          <button className="px-4 py-1">Archive</button>
        </div>
      </div>

      {/* Trip List */}
      <div className="p-4">
        <h2 className="text-sm text-white/70 mb-2">Your Trips</h2>
        <div className="bg-white/5 rounded-xl p-4">
          <h3 className="font-semibold">hello</h3>
          <p className="text-sm text-white/70">Tokyo Station Yaesu South Entrance</p>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-white/70">Mar 19 - Mar 26</span>
            <span className="text-sm text-white/70">$750 • 9 activities</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
        <div className="flex justify-around py-4">
          <button className="text-[#FFD700]">🛫</button>
          <button className="text-white/60">👥</button>
          <button className="text-white/60">🧭</button>
          <button className="text-white/60">📸</button>
          <button className="text-white/60">👤</button>
        </div>
      </div>
    </div>
  )

  const renderDetailsScreen = () => (
    <div className="h-full w-full bg-black text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2">
        <span>4:59</span>
        <div className="flex items-center gap-2">
          <span>▲▲▲</span>
          <span>Wi-Fi</span>
          <span>34%</span>
        </div>
      </div>

      {/* Header */}
      <div className="relative h-[200px]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-green-400/20" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <button className="p-2 rounded-full bg-black/20">←</button>
          <h1 className="text-xl font-bold">My Trips</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">hello</h2>
        <p className="text-white/70">Tokyo Station Yaesu South Entrance</p>
        <p className="text-white/70 mt-2">Mar 19, 2025 - Mar 26, 2025</p>

        <div className="mt-6">
          <p className="text-sm text-white/70">Notes</p>
          <p className="text-white/70">Trip generated by AI assistant</p>
        </div>

        <div className="flex gap-4 mt-6">
          <div className="flex-1 bg-white/5 rounded-xl p-4 text-center">
            <span className="text-xl">8</span>
            <p className="text-sm text-white/70">Days</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-xl p-4 text-center">
            <span className="text-xl">4</span>
            <p className="text-sm text-white/70">Stops</p>
          </div>
          <div className="flex-1 bg-white/5 rounded-xl p-4 text-center">
            <span className="text-xl">0/10</span>
            <p className="text-sm text-white/70">Packed</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderItineraryScreen = () => (
    <div className="h-full w-full bg-[#1a1a2e] text-white">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2">
        <span>4:59</span>
        <div className="flex items-center gap-2">
          <span>▲▲▲</span>
          <span>Wi-Fi</span>
          <span>34%</span>
        </div>
      </div>

      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <h1 className="text-2xl font-bold">Trip Itinerary</h1>
        <p className="text-right text-[#FFD700]">Total: $750</p>
      </div>

      {/* Itinerary List */}
      <div className="p-4 space-y-4">
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-white/70">Day 1</span>
            <span>2:00 PM</span>
          </div>
          <h3 className="font-semibold mb-1">Arrival & Check-in</h3>
          <p className="text-sm text-white/70">Arrive at destination and check into your hotel</p>
          <p className="text-right text-[#FFD700] mt-2">$250</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-white/70">Day 1</span>
            <span>7:00 PM</span>
          </div>
          <h3 className="font-semibold mb-1">Welcome Dinner</h3>
          <p className="text-sm text-white/70">Enjoy local cuisine at a recommended restaurant</p>
          <p className="text-right text-[#FFD700] mt-2">$80</p>
        </div>
      </div>
    </div>
  )

  switch (screen) {
    case 'map':
      return renderMapScreen()
    case 'trips':
      return renderTripsScreen()
    case 'details':
      return renderDetailsScreen()
    case 'itinerary':
      return renderItineraryScreen()
    default:
      return renderMapScreen()
  }
} 