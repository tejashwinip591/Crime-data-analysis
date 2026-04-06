const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Sample crime data storage (in production, use a database)
const crimeDataCache = {};

// Route to get crime statistics by city
app.get('/api/crime/city/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    // Sample data for major cities (USA and India)
    const sampleCityData = {
      // USA Cities
      'newyork': {
        name: 'New York Police Department',
        state: 'NY',
        country: 'USA',
        agency_type: 'Local Police',
        crime_data: { theft: 5234, assault: 3421, robbery: 1256, burglary: 1847, homicide: 700 }
      },
      'losangeles': {
        name: 'Los Angeles Police Department',
        state: 'CA',
        country: 'USA',
        agency_type: 'Local Police',
        crime_data: { theft: 4890, assault: 3156, robbery: 1189, burglary: 1756, homicide: 678 }
      },
      'chicago': {
        name: 'Chicago Police Department',
        state: 'IL',
        country: 'USA',
        agency_type: 'Local Police',
        crime_data: { theft: 4567, assault: 3234, robbery: 1234, burglary: 1623, homicide: 645 }
      },
      'houston': {
        name: 'Houston Police Department',
        state: 'TX',
        country: 'USA',
        agency_type: 'Local Police',
        crime_data: { theft: 4234, assault: 2987, robbery: 1023, burglary: 1456, homicide: 567 }
      },
      'denver': {
        name: 'Denver Police Department',
        state: 'CO',
        country: 'USA',
        agency_type: 'Local Police',
        crime_data: { theft: 3456, assault: 2456, robbery: 890, burglary: 1234, homicide: 456 }
      },
      // India Cities
      'delhi': {
        name: 'Delhi Police - Crime Department',
        state: 'Delhi',
        country: 'India',
        agency_type: 'State Police',
        crime_data: { theft: 8234, assault: 5678, robbery: 2345, burglary: 1234, homicide: 456 }
      },
      'mumbai': {
        name: 'Mumbai Police - Crime Branch',
        state: 'Maharashtra',
        country: 'India',
        agency_type: 'State Police',
        crime_data: { theft: 7645, assault: 4890, robbery: 2156, burglary: 1123, homicide: 389 }
      },
      'bangalore': {
        name: 'Bangalore City Police - Crime Department',
        state: 'Karnataka',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 6234, assault: 3945, robbery: 1678, burglary: 945, homicide: 234 }
      },
      'mangalore': {
        name: 'Mangalore Police - Crime Branch',
        state: 'Karnataka',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 2876, assault: 1654, robbery: 678, burglary: 423, homicide: 89 }
      },
      'belgaum': {
        name: 'Belgaum Police - Crime Department',
        state: 'Karnataka',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 2345, assault: 1345, robbery: 567, burglary: 345, homicide: 67 }
      },
      'mysore': {
        name: 'Mysore City Police - Crime Division',
        state: 'Karnataka',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 1876, assault: 1098, robbery: 423, burglary: 267, homicide: 54 }
      },
      'tumkur': {
        name: 'Tumkur Police - Crime Department',
        state: 'Karnataka',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 1234, assault: 756, robbery: 345, burglary: 189, homicide: 32 }
      },
      'davangere': {
        name: 'Davangere Police - Crime Branch',
        state: 'Karnataka',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 987, assault: 567, robbery: 267, burglary: 154, homicide: 23 }
      },
      'kolar': {
        name: 'Kolar Police - Crime Department',
        state: 'Karnataka',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 845, assault: 456, robbery: 189, burglary: 123, homicide: 18 }
      },
      'bijapur': {
        name: 'Bijapur Police - Crime Division',
        state: 'Karnataka',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 756, assault: 389, robbery: 156, burglary: 98, homicide: 16 }
      },
      'karnataka': {
        name: 'Karnataka State Police - Crime Wing',
        state: 'Karnataka',
        country: 'India',
        agency_type: 'State Police',
        crime_data: { theft: 27349, assault: 15145, robbery: 5632, burglary: 3421, homicide: 535 }
      },
      'india': {
        name: 'India National Crime Records Bureau',
        state: 'National',
        country: 'India',
        agency_type: 'National Police',
        crime_data: { theft: 156234, assault: 98765, robbery: 45678, burglary: 23456, homicide: 12345 }
      },
      'hyderabad': {
        name: 'Hyderabad Police - Crime Division',
        state: 'Telangana',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 5678, assault: 3456, robbery: 1534, burglary: 823, homicide: 198 }
      },
      'kolkata': {
        name: 'Kolkata Police - Crime Department',
        state: 'West Bengal',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 5432, assault: 3234, robbery: 1423, burglary: 756, homicide: 176 }
      },
      'chennai': {
        name: 'Chennai Police - Crime Branch',
        state: 'Tamil Nadu',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 4876, assault: 2987, robbery: 1256, burglary: 678, homicide: 145 }
      },
      'pune': {
        name: 'Pune Police - Crime Department',
        state: 'Maharashtra',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 4234, assault: 2567, robbery: 1089, burglary: 567, homicide: 123 }
      },
      'jaipur': {
        name: 'Jaipur Police - Crime Division',
        state: 'Rajasthan',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 3876, assault: 2345, robbery: 945, burglary: 489, homicide: 98 }
      },
      'ahmedabad': {
        name: 'Ahmedabad Police - Crime Branch',
        state: 'Gujarat',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 3645, assault: 2156, robbery: 834, burglary: 456, homicide: 87 }
      },
      'lucknow': {
        name: 'Lucknow Police - Crime Department',
        state: 'Uttar Pradesh',
        country: 'India',
        agency_type: 'City Police',
        crime_data: { theft: 3456, assault: 1987, robbery: 756, burglary: 389, homicide: 76 }
      }
    };

    const cityKey = city.toLowerCase();
    
    // Try to get data from FBI API first
    try {
      const response = await axios.get(
        `https://api.crime-data.org/api/v1/agencies?name=${city}`,
        {
          headers: { 'Accept': 'application/json' },
          timeout: 5000
        }
      );
      
      if (response.data && response.data.length > 0) {
        return res.json({
          success: true,
          city: city,
          data: response.data,
          source: 'FBI Crime Data API',
          timestamp: new Date()
        });
      }
    } catch (apiError) {
      console.log(`FBI API failed for ${city}, using sample data`);
    }

    // Use sample data as fallback
    if (sampleCityData[cityKey]) {
      return res.json({
        success: true,
        city: city,
        data: [sampleCityData[cityKey]],
        source: 'Sample Data',
        timestamp: new Date()
      });
    }

    // If no match, return generic message with available cities
    res.json({
      success: true,
      city: city,
      data: [],
      source: 'No Data',
      message: `No data found for "${city}". Try USA: New York, Los Angeles, Chicago, Houston, Denver. Or India (National): India. Or Indian States/Cities: Delhi, Mumbai, Hyderabad, Kolkata, Chennai, Pune, Jaipur, Ahmedabad, Lucknow, Karnataka (State), Bangalore, Mangalore, Belgaum, Mysore, Tumkur, Davangere, Kolar, Bijapur`,
      availableCities: Object.keys(sampleCityData),
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error fetching crime data:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching crime data',
      error: error.message
    });
  }
});

// Route to get crime statistics for a specific agency
app.get('/api/crime/agency/:agencyId', async (req, res) => {
  try {
    const { agencyId } = req.params;
    
    const response = await axios.get(
      `https://api.crime-data.org/api/v1/agencies/${agencyId}`,
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      agencyId: agencyId,
      data: response.data,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error fetching agency data:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching agency data',
      error: error.message
    });
  }
});

// Route to get crime trends data
app.get('/api/crime/trends', async (req, res) => {
  try {
    // Simulated crime trends data
    const trendsData = {
      categories: ['Theft', 'Assault', 'Robbery', 'Burglary', 'Homicide'],
      data: [
        {
          year: 2021,
          values: [45, 32, 15, 28, 8]
        },
        {
          year: 2022,
          values: [42, 35, 14, 25, 7]
        },
        {
          year: 2023,
          values: [38, 33, 12, 22, 6]
        },
        {
          year: 2024,
          values: [35, 30, 10, 20, 5]
        }
      ]
    };

    res.json({
      success: true,
      trends: trendsData,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trends data',
      error: error.message
    });
  }
});

// Route to get crime heatmap data
app.get('/api/crime/heatmap', async (req, res) => {
  try {
    const heatmapData = [
      // Major Indian Cities
      { lat: 28.6139, lng: 77.2090, intensity: 0.92, city: 'Delhi' },
      { lat: 19.0760, lng: 72.8777, intensity: 0.88, city: 'Mumbai' },
      { lat: 13.0827, lng: 80.2707, intensity: 0.85, city: 'Chennai' },
      { lat: 22.5726, lng: 88.3639, intensity: 0.82, city: 'Kolkata' },
      { lat: 17.3850, lng: 78.4867, intensity: 0.80, city: 'Hyderabad' },
      { lat: 23.1815, lng: 79.9864, intensity: 0.78, city: 'Indore' },
      { lat: 12.9716, lng: 77.5946, intensity: 0.75, city: 'Bangalore' },
      { lat: 31.6340, lng: 74.8711, intensity: 0.72, city: 'Ludhiana' },
      { lat: 21.1458, lng: 79.0882, intensity: 0.70, city: 'Nagpur' },
      { lat: 23.1815, lng: 79.9864, intensity: 0.68, city: 'Bhopal' },
      { lat: 18.5204, lng: 73.8567, intensity: 0.65, city: 'Pune' },
      { lat: 28.7041, lng: 77.1025, intensity: 0.62, city: 'Gurgaon' }
    ];

    res.json({
      success: true,
      heatmap: heatmapData,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching heatmap data',
      error: error.message
    });
  }
});

// Route to get crime statistics
app.get('/api/crime/stats', async (req, res) => {
  try {
    const stats = {
      totalCrimes: 12458,
      crimesByType: {
        theft: 5234,
        assault: 3421,
        robbery: 1256,
        burglary: 1847,
        homicide: 700
      },
      solvedCases: 8765,
      solveRate: 70.3,
      trending: 'downward'
    };

    res.json({
      success: true,
      stats: stats,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

// Route to get crime statistics by age group
app.get('/api/crime/age/:ageGroup', async (req, res) => {
  try {
    const { ageGroup } = req.params;
    
    // Age group data
    const ageGroupData = {
      '0-17': {
        label: 'Children & Teenagers (0-17)',
        crimes: 234,
        breakdown: { theft: 45, assault: 78, robbery: 23, burglary: 56, homicide: 32 },
        percentage: 1.9,
        description: 'Crimes involving victims aged 0-17 years'
      },
      '18-25': {
        label: 'Young Adults (18-25)',
        crimes: 1245,
        breakdown: { theft: 456, assault: 345, robbery: 189, burglary: 178, homicide: 77 },
        percentage: 10.0,
        description: 'Crimes involving victims aged 18-25 years'
      },
      '26-35': {
        label: 'Adults (26-35)',
        crimes: 2341,
        breakdown: { theft: 890, assault: 678, robbery: 345, burglary: 289, homicide: 139 },
        percentage: 18.8,
        description: 'Crimes involving victims aged 26-35 years'
      },
      '36-50': {
        label: 'Middle-Aged (36-50)',
        crimes: 4567,
        breakdown: { theft: 1734, assault: 1234, robbery: 678, burglary: 567, homicide: 354 },
        percentage: 36.7,
        description: 'Crimes involving victims aged 36-50 years'
      },
      '51-65': {
        label: 'Senior Adults (51-65)',
        crimes: 2456,
        breakdown: { theft: 934, assault: 567, robbery: 289, burglary: 345, homicide: 321 },
        percentage: 19.7,
        description: 'Crimes involving victims aged 51-65 years'
      },
      '65+': {
        label: 'Elderly (65+)',
        crimes: 1345,
        breakdown: { theft: 456, assault: 234, robbery: 123, burglary: 289, homicide: 243 },
        percentage: 10.8,
        description: 'Crimes involving victims aged 65+ years'
      },
      'all': {
        label: 'All Age Groups',
        crimes: 12188,
        breakdown: { theft: 4515, assault: 3136, robbery: 1647, burglary: 1724, homicide: 1166 },
        percentage: 100,
        description: 'Crime statistics across all age groups'
      }
    };

    const ageKey = ageGroup.toLowerCase();
    
    if (ageGroupData[ageKey]) {
      return res.json({
        success: true,
        ageGroup: ageGroup,
        data: ageGroupData[ageKey],
        source: 'Crime Database - Age Group Analysis',
        timestamp: new Date()
      });
    }

    // If no match, return available age groups
    res.json({
      success: true,
      ageGroup: ageGroup,
      data: null,
      source: 'No Data',
      message: `No data found for age group "${ageGroup}". Available options: 0-17, 18-25, 26-35, 36-50, 51-65, 65+, all`,
      availableAgeGroups: Object.keys(ageGroupData),
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error fetching age group data:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching age group data',
      error: error.message
    });
  }
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Crime Data API is running',
    timestamp: new Date()
  });
});

const server = app.listen(PORT, () => {
  console.log(`Crime Data Analysis Server running on http://localhost:${PORT}`);
  console.log('API endpoints:');
  console.log('  GET /api/health - Health check');
  console.log('  GET /api/crime/stats - Crime statistics');
  console.log('  GET /api/crime/trends - Crime trends');
  console.log('  GET /api/crime/heatmap - Crime heatmap data');
  console.log('  GET /api/crime/city/:city - Crime data by city');
  console.log('  GET /api/crime/agency/:agencyId - Crime data by agency');
  console.log('  GET /api/crime/age/:ageGroup - Crime data by age group (0-17, 18-25, 26-35, 36-50, 51-65, 65+, all)');
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the other process or set a different PORT in .env.`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});
