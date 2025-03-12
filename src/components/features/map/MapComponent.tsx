"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MapComponentProps {
  onLoad?: () => void
}

interface Location {
  latitude: number
  longitude: number
  name: string
  description: string
  type?: 'origin' | 'destination'
}

declare global {
  interface Window {
    mapkit?: any
  }
}

export default function MapComponent({ onLoad }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [route, setRoute] = useState<any>(null)

  // Example locations with route
  const locations: Location[] = [
    {
      latitude: 35.6762,
      longitude: 139.6503,
      name: "Tokyo",
      description: "Starting point of your journey",
      type: 'origin'
    },
    {
      latitude: 37.7749,
      longitude: -122.4194,
      name: "San Francisco",
      description: "Your destination",
      type: 'destination'
    }
  ]

  useEffect(() => {
    // Load Apple Maps
    const initializeMap = async () => {
      if (!window.mapkit || !mapRef.current) return

      // Initialize MapKit JS
      window.mapkit.init({
        authorizationCallback: (done: (token: string) => void) => {
          done(process.env.NEXT_PUBLIC_MAPKIT_TOKEN || '')
        },
        language: "en"
      })

      const newMap = new window.mapkit.Map(mapRef.current, {
        showsCompass: window.mapkit.FeatureVisibility.Visible,
        showsZoomControl: true,
        showsMapTypeControl: false,
        showsScale: window.mapkit.FeatureVisibility.Visible,
        colorScheme: window.mapkit.Map.ColorSchemes.Dark,
        mapType: window.mapkit.Map.MapTypes.SatelliteWithLabels
      })

      // Calculate the bounds that include both locations
      const points = locations.map(loc => 
        new window.mapkit.Coordinate(loc.latitude, loc.longitude)
      )
      const padding = new window.mapkit.Padding(50, 50, 50, 50)
      newMap.region = newMap.regionThatFits(points, padding)

      // Add custom styled markers for locations
      locations.forEach((location) => {
        const markerElement = document.createElement('div')
        markerElement.className = `w-6 h-6 rounded-full ${
          location.type === 'origin' ? 'bg-[#FFD700]' : 'bg-[#4CAF50]'
        } border-2 border-white shadow-lg`

        const marker = new window.mapkit.MarkerAnnotation(
          new window.mapkit.Coordinate(location.latitude, location.longitude),
          {
            calloutEnabled: true,
            title: location.name,
            subtitle: location.description,
            animates: true,
            customElement: markerElement
          }
        )

        marker.addEventListener('select', () => {
          setSelectedLocation(location)
        })

        newMap.addAnnotation(marker)
      })

      // Draw route between locations
      const [origin, destination] = locations
      const routePoints = [
        new window.mapkit.Coordinate(origin.latitude, origin.longitude),
        new window.mapkit.Coordinate(destination.latitude, destination.longitude)
      ]

      const style = new window.mapkit.Style({
        lineWidth: 4,
        lineGradient: {
          type: 'linear',
          colors: ['#FFD700', '#4CAF50'],
          locations: [0.0, 1.0]
        },
        lineDash: [8, 4],
        animate: true
      })

      const routeLine = new window.mapkit.PolylineOverlay(routePoints, { style })
      newMap.addOverlay(routeLine)
      setRoute(routeLine)

      setMap(newMap)
      if (onLoad) onLoad()
    }

    // Load MapKit JS script
    const script = document.createElement('script')
    script.src = 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js'
    script.async = true
    script.onload = initializeMap
    document.body.appendChild(script)

    return () => {
      if (map) {
        map.destroy()
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-2xl overflow-hidden" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-lg
                     p-6 rounded-xl shadow-lg z-10 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
              <span className={`w-3 h-3 rounded-full mr-2 ${
                selectedLocation.type === 'origin' ? 'bg-[#FFD700]' : 'bg-[#4CAF50]'
              }`} />
              {selectedLocation.name}
            </h3>
            <p className="text-white/70">
              {selectedLocation.description}
            </p>
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-3 right-3 text-white/50 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 