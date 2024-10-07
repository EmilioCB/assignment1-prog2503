// Function to load posts
function loadPosts() {
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) return;

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            posts.forEach((post, index) => {
                if (index < 9) {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    `;
                    postsContainer.appendChild(postElement);
                }
            });
        });
}

// Function to load more posts on scroll
function loadMorePosts() {
    const postsContainer = document.getElementById('posts-container');
    if (!postsContainer) return;

    let postCount = postsContainer.children.length;

    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(posts => {
                    for (let i = postCount; i < postCount + 3 && i < posts.length; i++) {
                        const postElement = document.createElement('div');
                        postElement.classList.add('post');
                        postElement.innerHTML = `
                            <h2>${posts[i].title}</h2>
                            <p>${posts[i].body}</p>
                        `;
                        postsContainer.appendChild(postElement);
                    }
                    postCount += 3;
                });
        }
    });
}

// Function to load weather data
function loadWeather() {
    const weatherContainer = document.getElementById('weather-container');
    if (!weatherContainer) return;

    const cities = [
	{ name: 'Tokyo', lat: 35.6895, lon: 139.6917 },
	{ name: 'New-York', lat: 40.7128, lon: -74.0060 },
	{ name: 'London', lat: 51.5074, lon: -0.1278 },
	{ name: 'Paris', lat: 48.8566, lon: 2.3522 },
	{ name: 'Sydney', lat: -33.8688, lon: 151.2093 },
	{ name: 'Berlin', lat: 52.5200, lon: 13.4049 },
	{ name: 'New-Delhi', lat: 28.6448, lon: 77.2167 },
	{ name: 'Moscow', lat: 55.7558, lon: 37.6176 },
	{ name: 'Cairo', lat: 30.0444, lon: 31.2357 },
	{ name: 'Rio-de-Janeiro', lat: -22.9068, lon: -43.1729 },
	{ name: 'Toronto', lat: 43.6511, lon: -79.3470 },
	{ name: 'Bangkok', lat: 13.7563, lon: 100.5018 }
    ];


    cities.forEach(city => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`)
            .then(response => response.json())
            .then(data => {
                let weatherCard = document.getElementById(city.name);
                if (!weatherCard) {
                    // If the card doesn't exist, create a new one
                    weatherCard = document.createElement('div');
                    weatherCard.id = city.name;
                    weatherCard.classList.add('weather-card');
                    weatherContainer.appendChild(weatherCard);
                }
                
                // Create or update temperature and description elements
                weatherCard.innerHTML = `
                    <h3>${city.name.replace('-', ' ')}</h3>
                    <p class="temperature">${data.current_weather.temperature}°C</p>
                    <p class="description">Wind speed: ${data.current_weather.windspeed} km/h</p>
                `;
            });
    });
}

// Function to update weather data every 5 minutes
function updateWeather() {
    setInterval(loadWeather, 300000);
}

// Run functions based on the current page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('posts-container')) {
        loadPosts();
        loadMorePosts();
    } else if (document.getElementById('weather-container')) {
        loadWeather();
        updateWeather();
    }
});

// Call fetchHomeData() for the home page
if (document.getElementById('main-container')) {
    fetchHomeData();
}
