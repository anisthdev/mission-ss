import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { odishaDistricts } from '../../data/odishaDistrictsData';
import { fadeInUp } from '../../utils/animations';
import { X } from 'lucide-react';

export default function OdishaMap() {
  const { t } = useTranslation();
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const operationalDistricts = odishaDistricts.filter(d => d.isOperational && d.lat && d.lng);

  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '24px',
    overflow: 'hidden'
  };

  const mapCenter = {
    lat: 20.5937,
    lng: 84.8394
  };

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: 11
    },
    styles: [
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#e9e9e9' }]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#f3f3f3' }]
      }
    ]
  };

  const getMarkerColor = (district) => {
    if (selectedDistrict?.id === district.id) return 'FF0000';
    if (hoveredMarker?.id === district.id) return district.color.replace('#', '');
    return district.color.replace('#', '');
  };

  return (
    <section className="py-20 bg-white dark:bg-[rgb(var(--dark-bg-primary))] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-saffron-100 dark:bg-saffron-900/30 text-saffron-600 dark:text-saffron-400 text-sm font-semibold mb-4">
            {t('map.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            {t('map.heading')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('map.description')}
          </p>
        </motion.div>

        {/* Map and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Google Map */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-50 dark:bg-slate-800 rounded-3xl p-6 shadow-xl">
              <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={7}
                  options={mapOptions}
                >
                  {operationalDistricts.map((district) => (
                    <MarkerF
                      key={district.id}
                      position={{ lat: district.lat, lng: district.lng }}
                      onClick={() => setSelectedDistrict(district)}
                      onMouseOver={() => setHoveredMarker(district)}
                      onMouseOut={() => setHoveredMarker(null)}
                      icon={{
                        path: 'M 0,-20 a 20,20 0 1,1 0,40 a 20,20 0 1,1 0,-40',
                        fillColor: `#${getMarkerColor(district)}`,
                        fillOpacity: 1,
                        strokeColor: '#ffffff',
                        strokeWeight: 3,
                        scale: 0.8,
                        anchor: { x: 0, y: 0 }
                      }}
                      title={district.name}
                    >
                      {selectedDistrict?.id === district.id && (
                        <InfoWindowF
                          onCloseClick={() => setSelectedDistrict(null)}
                          position={{ lat: district.lat, lng: district.lng }}
                        >
                          <div className="p-2 bg-white dark:bg-slate-800 rounded text-sm">
                            <p className="font-bold text-gray-900 dark:text-white">{district.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{district.status}</p>
                          </div>
                        </InfoWindowF>
                      )}
                    </MarkerF>
                  ))}
                </GoogleMap>
              </LoadScript>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-6 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FF6B35' }} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{t('map.legend.high')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFA500' }} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{t('map.legend.medium')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#FFD699' }} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{t('map.legend.active')}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* District Details Sidebar */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            {selectedDistrict ? (
              <div className="bg-gradient-to-br from-saffron-50 to-orange-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-6 shadow-xl sticky top-20 max-h-96 overflow-y-auto">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
                    {selectedDistrict.name}
                  </h3>
                  <button
                    onClick={() => setSelectedDistrict(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-saffron-200 dark:bg-saffron-900/50 text-saffron-700 dark:text-saffron-300 text-xs font-semibold">
                    {selectedDistrict.status}
                  </span>
                </div>

                {selectedDistrict.families && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('map.sidebar.families')}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedDistrict.families.toLocaleString()}+
                    </p>
                  </div>
                )}

                {selectedDistrict.programs && selectedDistrict.programs.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t('map.sidebar.programs')}</p>
                    <ul className="space-y-1">
                      {selectedDistrict.programs.map((program, idx) => (
                        <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-saffron-600 dark:text-saffron-400 mt-1">•</span>
                          {program}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedDistrict.blocks && selectedDistrict.blocks.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t('map.sidebar.blocks')}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDistrict.blocks.map((block, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                        >
                          {block}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDistrict.areas && selectedDistrict.areas.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{t('map.sidebar.areas')}</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedDistrict.areas.map((area, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-6 shadow-xl text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">{t('map.sidebar.noSelection')}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{t('map.sidebar.instruction')}</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          <div className="bg-saffron-50 dark:bg-slate-800 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-saffron-600 dark:text-saffron-400 mb-1">18</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('map.stats.districts')}</p>
          </div>
          <div className="bg-emerald-50 dark:bg-slate-800 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">165K+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('map.stats.families')}</p>
          </div>
          <div className="bg-blue-50 dark:bg-slate-800 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">22+</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('map.stats.years')}</p>
          </div>
          <div className="bg-purple-50 dark:bg-slate-800 rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">6</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t('map.stats.programs')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
