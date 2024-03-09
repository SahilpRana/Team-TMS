import React, { useState, useEffect } from 'react';

const NearestMunicipalityFinder = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestMunicipality, setNearestMunicipality] = useState('');
  const [minDistance, setMinDistance] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // const { latitude, longitude } = position.coords;
            setUserLocation(position.coords)
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    

   
    getUserLocation();
  }, []);

  useEffect(() => {
    const calculateDistance = (coord1, coord2) => {
      const R = 6371; // Radius of the Earth in kilometers
      const lat1 = coord1.latitude;
      const lon1 = coord1.longitude;
      const lat2 = coord2.latitude;
      const lon2 = coord2.longitude;

      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance; // Distance in kilometers
    };

    const municipalities = [
      { name: 'Municipal council Bilaspur', latitude: 31.33918975292773, longitude: 76.75704773589915 },
      { name: 'Municipal Council Ghumarwin', latitude: 31.445405767767912, longitude: 76.70731007927567 },
      { name: 'Municipal Council Shree Naina Devi Ji', latitude: 31.305725436008455, longitude: 76.53465866256789 },
      { name: 'Nagar Panchayat Talai', latitude: 31.30681204894085, longitude: 76.7395976136065 },
      { name: 'Municipal Council Mehatpur Basdehra', latitude: 31.405859457029543, longitude: 76.33725445559858 },
      { name: 'Municipal Council Santokhgarh', latitude: 31.468644643695193, longitude: 76.2713782287069 },
      { name: 'Municipal Council Una', latitude: 31.468273105936202, longitude: 76.2691076578011 },
      { name: 'Nagar Panchayat AMB', latitude: 31.684757835144012, longitude: 76.11656942023795 },
      { name: 'Nagar Panchayat Daulatpur Chowk', latitude: 31.686038172003478, longitude: 76.1160242879777 },
      { name: 'Nagar Panchayat Gagret', latitude: 31.657411401399827, longitude: 76.059724764418 },
      { name: 'Nagar Panchayat Tahliwal', latitude: 31.684776094566583, longitude: 76.11655869140195 },
      { name: 'Municipal Council Chamba', latitude: 32.55501963539812, longitude: 76.12570860674597 },
      { name: 'Municipal Council Dalhousie', latitude: 32.53900136153343, longitude: 75.9627888785587 },
      { name: 'Nagar Panchayat Chowari', latitude: 32.43229788312151, longitude: 76.012277135582 },
      { name: 'Municipal Committee Office', latitude: 32.10328535482609, longitude: 76.27186501580479 },
      { name: 'Municipal Banquet Hall', latitude: 32.08972185344799, longitude: 76.26049296362078 },
      { name: 'Municipal Corporation', latitude: 32.10322855182006, longitude: 76.2718576928211 },
      { name: 'Municipal Council, Jawalamukhi, Kangra', latitude: 31.874727629638677, longitude: 76.32102272516669 },
      { name: 'Municipal Corporation Dharamshala', latitude: 32.21555606447956, longitude: 76.31824785211047 },
      { name: 'Municipal Council Palampur', latitude: 32.11276625405875, longitude: 76.53718860873454 },
      { name: 'Municipal Council Kullu', latitude: 31.96315496290433, longitude: 77.11527610768475 },
      { name: 'Municipal Council', latitude: 31.990622766477255, longitude: 76.79262437394692 },
      { name: 'Municipal Corporation Mandi', latitude: 31.709374989707072, longitude: 76.9311607591485 },
      { name: 'Municipal Committee', latitude: 31.709369015219654, longitude: 76.93116310008766 },
      { name: 'Municipal Council Rohru', latitude: 31.20342904337866, longitude: 77.75694850865035 },
      { name: 'Municipal council Rampur', latitude: 31.447472357397892, longitude: 77.62930798220307 },
      { name: 'Nagar Nigam ', latitude: 31.105708, longitude: 77.175713 },
      { name: 'Municipal corporation', latitude: 31.10521, longitude: 77.17073 },
      { name: 'Municipal corporation building', latitude: 31.105440, longitude: 77.170790 },
      { name: 'Municipal corporation Rajgarh', latitude: 30.90696, longitude: 77.10293 },
      { name: 'Municipal corporation Nahan', latitude: 30.56262, longitude: 77.29394 },
      { name: 'Municipal council Paonta sahib', latitude: 30.43613, longitude: 77.62395 },
      { name: 'MC office hamirpur', latitude: 31.68563, longitude: 76.52325 },
      { name: 'Municipal committee office', latitude: 31.68551, longitude: 76.5228 }
  ];
  

    if (userLocation) {
      let minDistance = Number.MAX_SAFE_INTEGER;
      let nearestMunicipality = '';

      municipalities.forEach(municipality => {
        const distance = calculateDistance(userLocation, {
          latitude: municipality.latitude,
          longitude: municipality.longitude
        });
        if (distance < minDistance) {
          minDistance = distance;
          nearestMunicipality = municipality.name;
        }
      });

      setNearestMunicipality(nearestMunicipality);
      setMinDistance(minDistance);
    }
  }, [userLocation]);

  return (
    <div>
      <h2 className='text-2xl mb-4 font-semibold'>Nearest Municipality Finder</h2>
      {userLocation && (
        <p>Your current location: <div className='inline font-medium'>{userLocation.latitude}, {userLocation.longitude}</div></p>
      )}
      {nearestMunicipality && minDistance && (
        <p>The nearest municipality is <div className='inline font-medium'>{nearestMunicipality}</div> at a distance of <div className='inline font-medium'>{minDistance.toFixed(2)}</div> kilometers.</p>
      )}
    </div>
  );
};

export default NearestMunicipalityFinder;
