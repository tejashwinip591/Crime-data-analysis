/**
 * Sample Crime Data for Testing
 * Use this data to populate your database or API responses
 */

const SAMPLE_CRIME_DATA = {
    // Crime statistics by type
    crimeByType: {
        theft: {
            2021: 5234,
            2022: 4890,
            2023: 4567,
            2024: 4234
        },
        assault: {
            2021: 3421,
            2022: 3567,
            2023: 3456,
            2024: 3234
        },
        robbery: {
            2021: 1256,
            2022: 1189,
            2023: 1234,
            2024: 1023
        },
        burglary: {
            2021: 1847,
            2022: 1756,
            2023: 1623,
            2024: 1456
        },
        homicide: {
            2021: 700,
            2022: 678,
            2023: 645,
            2024: 567
        }
    },

    // Cities with crime data
    citiesData: [
        {
            name: 'New York',
            state: 'NY',
            lat: 40.7128,
            lng: -74.0060,
            totalCrimes: 2341,
            solvedCases: 1678,
            agencies: 45,
            population: 8336817
        },
        {
            name: 'Los Angeles',
            state: 'CA',
            lat: 34.0522,
            lng: -118.2437,
            totalCrimes: 1892,
            solvedCases: 1304,
            agencies: 32,
            population: 3979576
        },
        {
            name: 'Chicago',
            state: 'IL',
            lat: 41.8781,
            lng: -87.6298,
            totalCrimes: 1567,
            solvedCases: 1098,
            agencies: 28,
            population: 2693976
        },
        {
            name: 'Houston',
            state: 'TX',
            lat: 29.7604,
            lng: -95.3698,
            totalCrimes: 1234,
            solvedCases: 864,
            agencies: 22,
            population: 2320268
        },
        {
            name: 'Denver',
            state: 'CO',
            lat: 39.7392,
            lng: -104.9903,
            totalCrimes: 890,
            solvedCases: 623,
            agencies: 18,
            population: 715522
        },
        {
            name: 'Seattle',
            state: 'WA',
            lat: 47.6062,
            lng: -122.3321,
            totalCrimes: 756,
            solvedCases: 529,
            agencies: 15,
            population: 753675
        },
        {
            name: 'San Francisco',
            state: 'CA',
            lat: 37.7749,
            lng: -122.4194,
            totalCrimes: 645,
            solvedCases: 451,
            agencies: 12,
            population: 873965
        },
        {
            name: 'Miami',
            state: 'FL',
            lat: 25.7617,
            lng: -80.1918,
            totalCrimes: 834,
            solvedCases: 584,
            agencies: 14,
            population: 442241
        }
    ],

    // Detailed crime statistics
    detailedStats: {
        totalCrimes: 12458,
        totalSolvedCases: 8765,
        solveRate: 70.3,
        clearanceRate: 68.5,
        yearOverYearChange: -3.2,
        monthlyTrend: [
            { month: 'January', crimes: 1045, solved: 731 },
            { month: 'February', crimes: 989, solved: 692 },
            { month: 'March', crimes: 1123, solved: 786 },
            { month: 'April', crimes: 1067, solved: 747 },
            { month: 'May', crimes: 1156, solved: 809 },
            { month: 'June', crimes: 1234, solved: 864 },
            { month: 'July', crimes: 1289, solved: 902 },
            { month: 'August', crimes: 1345, solved: 941 },
            { month: 'September', crimes: 1123, solved: 786 },
            { month: 'October', crimes: 945, solved: 661 },
            { month: 'November', crimes: 867, solved: 607 },
            { month: 'December', crimes: 876, solved: 613 }
        ]
    },

    // Crime by location/neighborhood
    neighborhoodCrime: [
        { area: 'Downtown', crimes: 456, intensity: 0.95 },
        { area: 'Midtown', crimes: 323, intensity: 0.75 },
        { area: 'Uptown', crimes: 234, intensity: 0.60 },
        { area: 'Southside', crimes: 567, intensity: 1.0 },
        { area: 'Westside', crimes: 189, intensity: 0.45 },
        { area: 'East End', crimes: 267, intensity: 0.65 },
        { area: 'Suburbs', crimes: 123, intensity: 0.30 }
    ],

    // Crime demographics
    demographics: {
        byAge: {
            '0-17': 234,
            '18-25': 1245,
            '26-35': 2341,
            '36-50': 4567,
            '51+': 3456
        },
        byGender: {
            male: 8234,
            female: 4123,
            unknown: 101
        },
        byEthnicity: {
            caucasian: 3456,
            african_american: 2567,
            hispanic: 3124,
            asian: 1234,
            other: 2077
        }
    },

    // Crime response metrics
    responseMetrics: {
        averageResponseTime: '5.2 minutes',
        medianResponseTime: '4.8 minutes',
        fastestResponse: '0.3 minutes',
        slowestResponse: '18.5 minutes'
    },

    // Year-over-year comparison
    yearComparison: {
        2020: { crimes: 13456, solved: 9234 },
        2021: { crimes: 12876, solved: 8967 },
        2022: { crimes: 12234, solved: 8756 },
        2023: { crimes: 12567, solved: 8932 },
        2024: { crimes: 12458, solved: 8765 }
    },

    // Heatmap intensities
    heatmapData: [
        { lat: 40.7128, lng: -74.0060, intensity: 0.95, city: 'New York', label: 'Critical' },
        { lat: 34.0522, lng: -118.2437, intensity: 0.87, city: 'Los Angeles', label: 'High' },
        { lat: 41.8781, lng: -87.6298, intensity: 0.82, city: 'Chicago', label: 'High' },
        { lat: 29.7604, lng: -95.3698, intensity: 0.76, city: 'Houston', label: 'Medium-High' },
        { lat: 39.7392, lng: -104.9903, intensity: 0.68, city: 'Denver', label: 'Medium' },
        { lat: 47.6062, lng: -122.3321, intensity: 0.58, city: 'Seattle', label: 'Medium' },
        { lat: 37.7749, lng: -122.4194, intensity: 0.52, city: 'San Francisco', label: 'Medium-Low' },
        { lat: 25.7617, lng: -80.1918, intensity: 0.67, city: 'Miami', label: 'Medium' }
    ],

    // Most common crimes
    mostCommonCrimes: [
        { rank: 1, crime: 'Theft', count: 5234, percentage: 41.9 },
        { rank: 2, crime: 'Assault', count: 3421, percentage: 27.4 },
        { rank: 3, crime: 'Burglary', count: 1847, percentage: 14.8 },
        { rank: 4, crime: 'Robbery', count: 1256, percentage: 10.1 },
        { rank: 5, crime: 'Homicide', count: 700, percentage: 5.6 }
    ],

    // Time of day analysis
    timeOfDayAnalysis: {
        '00:00-03:00': { crimes: 456, percentage: 3.7 },
        '03:00-06:00': { crimes: 234, percentage: 1.9 },
        '06:00-09:00': { crimes: 567, percentage: 4.5 },
        '09:00-12:00': { crimes: 1234, percentage: 9.9 },
        '12:00-15:00': { crimes: 2341, percentage: 18.8 },
        '15:00-18:00': { crimes: 3456, percentage: 27.7 },
        '18:00-21:00': { crimes: 2987, percentage: 23.9 },
        '21:00-00:00': { crimes: 1183, percentage: 9.5 }
    },

    // Day of week analysis
    dayOfWeekAnalysis: [
        { day: 'Monday', crimes: 1834, trend: 'up' },
        { day: 'Tuesday', crimes: 1723, trend: 'down' },
        { day: 'Wednesday', crimes: 1567, trend: 'down' },
        { day: 'Thursday', crimes: 1901, trend: 'up' },
        { day: 'Friday', crimes: 2156, trend: 'up' },
        { day: 'Saturday', crimes: 2345, trend: 'up' },
        { day: 'Sunday', crimes: 1932, trend: 'down' }
    ]
};

module.exports = SAMPLE_CRIME_DATA;
