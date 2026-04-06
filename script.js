const API_BASE_URL = 'http://localhost:5000/api';

// Chart instances
let chartsMap = {};
let crimeMap = null;
let crimeMarkers = {};

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Dashboard initialized');
    loadDashboard();
    showSection('dashboard');
});

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        
        // Load specific data based on section
        if (sectionId === 'dashboard') {
            loadDashboard();
        } else if (sectionId === 'trends') {
            loadTrends();
        } else if (sectionId === 'heatmap') {
            loadHeatmap();
        }
    }
}

// Load dashboard data
async function loadDashboard() {
    try {
        const response = await axios.get(`${API_BASE_URL}/crime/stats`);
        
        if (response.data.success) {
            const stats = response.data.stats;
            
            // Update stat cards
            document.getElementById('totalCrimes').textContent = 
                stats.totalCrimes.toLocaleString();
            document.getElementById('solvedCases').textContent = 
                stats.solvedCases.toLocaleString();
            document.getElementById('solveRate').textContent = 
                stats.solveRate.toFixed(1) + '%';
            
            // Load charts
            loadCrimeTypesChart(stats.crimesByType);
            loadCrimeDistributionChart(stats.crimesByType);
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showError('Failed to load dashboard data');
    }
}

// Load crime types chart
function loadCrimeTypesChart(crimeData) {
    const ctx = document.getElementById('crimeTypesChart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (chartsMap['crimeTypes']) {
        chartsMap['crimeTypes'].destroy();
    }

    const labels = Object.keys(crimeData);
    const values = Object.values(crimeData);
    const colors = ['#e74c3c', '#3498db', '#f39c12', '#27ae60', '#9b59b6'];

    chartsMap['crimeTypes'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels.map(l => l.charAt(0).toUpperCase() + l.slice(1)),
            datasets: [{
                label: 'Crime Count',
                data: values,
                backgroundColor: colors.slice(0, labels.length),
                borderRadius: 5,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

// Load crime distribution chart
function loadCrimeDistributionChart(crimeData) {
    const ctx = document.getElementById('crimeDistributionChart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (chartsMap['distribution']) {
        chartsMap['distribution'].destroy();
    }

    const labels = Object.keys(crimeData);
    const values = Object.values(crimeData);
    const colors = ['#e74c3c', '#3498db', '#f39c12', '#27ae60', '#9b59b6'];

    chartsMap['distribution'] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels.map(l => l.charAt(0).toUpperCase() + l.slice(1)),
            datasets: [{
                data: values,
                backgroundColor: colors.slice(0, labels.length),
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Load crime trends
async function loadTrends() {
    try {
        const response = await axios.get(`${API_BASE_URL}/crime/trends`);
        
        if (response.data.success) {
            loadTrendsChart(response.data.trends);
        }
    } catch (error) {
        console.error('Error loading trends:', error);
        showError('Failed to load trends data');
    }
}

// Load trends chart
function loadTrendsChart(trendsData) {
    const ctx = document.getElementById('trendsChart');
    if (!ctx) return;

    // Destroy existing chart if it exists
    if (chartsMap['trends']) {
        chartsMap['trends'].destroy();
    }

    const datasets = trendsData.categories.map((category, index) => {
        const colors = ['#e74c3c', '#3498db', '#f39c12', '#27ae60', '#9b59b6'];
        return {
            label: category,
            data: trendsData.data.map(d => d.values[index]),
            borderColor: colors[index],
            backgroundColor: colors[index] + '20',
            tension: 0.3,
            fill: true,
            pointRadius: 5,
            pointBackgroundColor: colors[index],
            pointBorderColor: '#fff',
            pointBorderWidth: 2
        };
    });

    chartsMap['trends'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: trendsData.data.map(d => d.year),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Crimes'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year'
                    }
                }
            }
        }
    });
}

// Search city
async function searchCity() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (!city) {
        showError('Please enter a city name');
        return;
    }

    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '<div class="loading">Loading data...</div>';

    try {
        const response = await axios.get(`${API_BASE_URL}/crime/city/${city}`);
        
        if (response.data.success) {
            displaySearchResults(response.data);
        }
    } catch (error) {
        console.error('Error searching city:', error);
        resultsContainer.innerHTML = `
            <div class="error-message">
                <strong>No data found for "${city}"</strong><br>
                Please try another city name or check the spelling.
            </div>
        `;
    }
}

// Display search results
function displaySearchResults(data) {
    const resultsContainer = document.getElementById('searchResults');
    
    if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        const html = data.data.map(agency => {
            const crimeData = agency.crime_data || {};
            const crimeList = Object.entries(crimeData)
                .map(([type, count]) => `<li>${type.charAt(0).toUpperCase() + type.slice(1)}: ${count.toLocaleString()}</li>`)
                .join('');
            
            return `
            <div class="result-card">
                <h4>${agency.name || 'Unknown Agency'}</h4>
                <p><strong>State:</strong> ${agency.state || 'N/A'}</p>
                <p><strong>Type:</strong> ${agency.agency_type || 'N/A'}</p>
                <p><strong>Crime Data:</strong></p>
                ${crimeList ? `<ul style="margin: 10px 0; padding-left: 20px;">${crimeList}</ul>` : '<p>No crime data available</p>'}
                <p class="timestamp">Source: ${data.source || 'Crime Database'} | Last Updated: ${new Date().toLocaleDateString()}</p>
            </div>
            `;
        }).join('');
        
        resultsContainer.innerHTML = html;
        showSuccess(`Found ${data.data.length} result(s) for "${data.city}"`);
    } else {
        const availableCities = data.availableCities ? `<p><strong>Try one of these cities:</strong> ${data.availableCities.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}</p>` : '';
        resultsContainer.innerHTML = `
            <div class="error-message">
                <strong>No data found for "${data.city}"</strong><br>
                ${data.message || 'Try searching for a larger city or check the spelling.'}
                ${availableCities}
            </div>
        `;
    }
}

// Load heatmap data
async function loadHeatmap() {
    try {
        const response = await axios.get(`${API_BASE_URL}/crime/heatmap`);
        
        if (response.data.success) {
            displayHeatmapMap(response.data.heatmap);
            displayHeatmap(response.data.heatmap);
        }
    } catch (error) {
        console.error('Error loading heatmap:', error);
        showError('Failed to load heatmap data');
    }
}

// Initialize and display crime heatmap on India map
function displayHeatmapMap(heatmapData) {
    const mapContainer = document.getElementById('crimeMap');
    if (!mapContainer) return;
    
    // Initialize map if not already done
    if (!crimeMap) {
        // India center coordinates
        crimeMap = L.map('crimeMap').setView([20.5937, 78.9629], 4);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(crimeMap);
    } else {
        // Clear existing markers
        Object.values(crimeMarkers).forEach(marker => crimeMap.removeLayer(marker));
        crimeMarkers = {};
    }
    
    // Add markers for each location
    heatmapData.forEach(location => {
        let color = '#27ae60'; // Green - Low
        let intensity = location.intensity;
        
        if (intensity >= 0.8) {
            color = '#e74c3c'; // Red - High
        } else if (intensity >= 0.6) {
            color = '#f39c12'; // Orange - Medium
        }
        
        const markerSize = 20 + (intensity * 30); // Size based on intensity
        const html = `
            <div style="
                width: ${markerSize}px;
                height: ${markerSize}px;
                background-color: ${color};
                border-radius: 50%;
                border: 3px solid white;
                opacity: 0.8;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                color: white;
                font-size: 12px;
            ">${(intensity * 100).toFixed(0)}%</div>
        `;
        
        const marker = L.marker([location.lat, location.lng], {
            icon: L.divIcon({
                html: html,
                iconSize: [markerSize, markerSize],
                className: 'crime-marker'
            })
        }).addTo(crimeMap);
        
        marker.bindPopup(`
            <div style="width: 200px;">
                <h4>${location.city}</h4>
                <p><strong>Crime Intensity:</strong> ${(intensity * 100).toFixed(1)}%</p>
                <p><strong>Coordinates:</strong> ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}</p>
            </div>
        `);
        
        crimeMarkers[location.city] = marker;
    });
    
    // Fit bounds to show all markers
    if (Object.keys(crimeMarkers).length > 0) {
        const group = new L.featureGroup(Object.values(crimeMarkers));
        crimeMap.fitBounds(group.getBounds().pad(0.1));
    }
}

// Display heatmap
function displayHeatmap(heatmapData) {
    const container = document.getElementById('heatmapData');
    
    const html = heatmapData.map(location => {
        let intensityClass = 'intensity-low';
        let intensityText = 'Low';
        
        if (location.intensity >= 0.8) {
            intensityClass = 'intensity-high';
            intensityText = 'High';
        } else if (location.intensity >= 0.6) {
            intensityClass = 'intensity-medium';
            intensityText = 'Medium';
        }
        
        return `
            <div class="heatmap-item ${intensityClass}">
                <div class="city-name">${location.city}</div>
                <div class="intensity-value">${(location.intensity * 100).toFixed(0)}%</div>
                <div class="intensity-label">${intensityText} Intensity</div>
                <div style="font-size: 0.8em; margin-top: 10px;">
                    📍 ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}

// Show error message
function showError(message) {
    console.error(message);
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.textContent = message;
    
    const mainContent = document.querySelector('.main-content');
    if (mainContent.firstChild) {
        mainContent.insertBefore(messageDiv, mainContent.firstChild);
    }
    
    setTimeout(() => messageDiv.remove(), 5000);
}

// Show success message
function showSuccess(message) {
    console.log(message);
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    
    const mainContent = document.querySelector('.main-content');
    if (mainContent.firstChild) {
        mainContent.insertBefore(messageDiv, mainContent.firstChild);
    }
    
    setTimeout(() => messageDiv.remove(), 5000);
}

// Search by age group
async function searchByAge() {
    const ageSelect = document.getElementById('ageGroupSelect');
    const ageGroup = ageSelect.value.trim();

    if (!ageGroup) {
        showError('Please select an age group');
        return;
    }

    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '<div class="loading">Loading age group data...</div>';

    try {
        const response = await axios.get(`${API_BASE_URL}/crime/age/${ageGroup}`);
        
        if (response.data && response.data.data) {
            displayAgeGroupResults(response.data);
        } else {
            resultsContainer.innerHTML = `
                <div class="error-message">
                    <strong>No data available</strong><br>
                    Available age groups: 0-17, 18-25, 26-35, 36-50, 51-65, 65+, all
                </div>
            `;
        }
    } catch (error) {
        console.error('Error searching age group:', error);
        resultsContainer.innerHTML = `
            <div class="error-message">
                <strong>Error fetching age group data</strong><br>
                Please try again or select a valid age group.
            </div>
        `;
    }
}

// Display age group results
function displayAgeGroupResults(response) {
    const resultsContainer = document.getElementById('searchResults');
    const ageData = response.data;
    
    if (ageData) {
        const crimeList = Object.entries(ageData.breakdown)
            .map(([type, count]) => `<li><strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong> ${count.toLocaleString()} crimes</li>`)
            .join('');
        
        const html = `
            <div class="result-card">
                <h3>${ageData.label}</h3>
                <p><strong>Total Crimes:</strong> ${ageData.crimes.toLocaleString()}</p>
                <p><strong>Percentage of Total:</strong> ${ageData.percentage}%</p>
                <p><strong>Description:</strong> ${ageData.description}</p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h4 style="margin-top: 0;">Crime Breakdown by Type:</h4>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        ${crimeList}
                    </ul>
                </div>
                <p class="timestamp">Data updated: ${new Date().toLocaleDateString()}</p>
            </div>
        `;
        
        resultsContainer.innerHTML = html;
        showSuccess(`Age group data loaded successfully`);
    } else {
        resultsContainer.innerHTML = `
            <div class="error-message">
                <strong>No data available</strong><br>
                Please select a valid age group.
            </div>
        `;
    }
}

// Allow Enter key to search
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.getElementById('cityInput') === document.activeElement) {
        searchCity();
    }
});
