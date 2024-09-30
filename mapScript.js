/**
 * StAuth10244: I Alexander Hernandez, 000896328 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
 */

let map;
let my_latitude, my_longitude;
let markersArray = [];
let userMarkersArray = [];
let new_icon;
let directionsRenderer;
const apiKey = "api_key";
import { interest_locations } from './initialLocationsInitializer.js';
import { hotels } from './hotelLocationsInitializer.js';
import { restaurants } from './restaurantLocationsInitializer.js';
import { waterfalls } from './waterfallLocationsInitializer.js';

async function initMap() 
{
    let mohawkloc = { lat: 43.2387, lng: -79.8881 };

    map = new google.maps.Map(document.getElementById("map"), 
    {
        center: mohawkloc,
        zoom: 12,
        mapId: "a9ce32fcf4b38c79",
    });

    setInitialMarkers();
}

function setInitialMarkers() 
{
    for(let i = 0; i < interest_locations.length; i++) 
    {
        let place = interest_locations[i];
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/red-blank.png";
        getCoordinatesAndSetMarker(place, new_icon);
    }
}

function setHotelMarkers() 
{
    for(let i = 0; i < hotels.length; i++) 
    {
        let hotel = hotels[i];
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/ylw-blank.png";
        getCoordinatesAndSetMarker(hotel, new_icon);
    }
}

function setRestaurantMarkers() 
{
    for(let i = 0; i < restaurants.length; i++) 
    {
        let restaurant = restaurants[i];
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/blu-blank.png";
        getCoordinatesAndSetMarker(restaurant, new_icon);
    }
}

function setWaterfallMarkers() 
{
    for(let i = 0; i < waterfalls.length; i++) 
    {
        let waterfall = waterfalls[i];
        new_icon = "http://maps.google.com/mapfiles/kml/paddle/grn-blank.png";
        getCoordinatesAndSetMarker(waterfall, new_icon);
    }
}

function getCoordinatesAndSetMarker(place, new_icon, isUserMarker = false)
{
    const cityLocation = ", Hamilton, ON";
    const actualLocation = (place.name !== undefined && place.name !== null) ? place.name : place;
    const geoCodeURL = generateGeocodeURL(actualLocation, cityLocation);

    fetchCoordinates(geoCodeURL)
        .then(location => {
            const marker = createMarker(location, actualLocation, new_icon);
            if(isUserMarker)
            {
                userMarkersArray.push(marker);
            }
            else
            {
                markersArray.push(marker);
            }
            
            setupMarkerClickListener(marker, place);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function generateGeocodeURL(name, cityLocation) 
{
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(name + cityLocation)}&key=${apiKey}`;
}

function fetchCoordinates(geoCodeURL) 
{
    return fetch(geoCodeURL)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') 
            {
                return data.results[0].geometry.location;
            } 
            else 
            {
                throw new Error(`Geocode failed with status: ${data.status}`);
            }
        });
}

function createMarker(location, place, new_icon) 
{
    const icon_content = document.createElement("img");
    icon_content.src = new_icon;
    return new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: location,
        title: place.name,
        content: icon_content
    });
}

function setupMarkerClickListener(marker, place) 
{
    const contentString = generateInfoWindowContent(place);
    const infowindow = new google.maps.InfoWindow({ content: contentString });

    marker.addListener("click", function () {
        infowindow.open({
            anchor: marker,
            map: map,
            shouldFocus: false,
        });
        
        const markerLatLng = getMarkerLatLng(marker);
        console.log("Latitude: ", markerLatLng.latitude);
        console.log("Longitude: ", markerLatLng.longitude);

        updateInfoWindowUI(place, markerLatLng);
    });
}

function getMarkerLatLng(marker) {
    const latitude = marker.position.lat;
    const longitude = marker.position.lng;
    return { latitude, longitude };
}

function generateInfoWindowContent(place) 
{
    return `
        <h6>${place.name}</h6>
        <p>${place.content}</p>
        <p><strong>Address:</strong> ${place.address}</p>
        <p><strong>Phone:</strong> ${place.phone}</p>
        <p><strong>Email:</strong> <a href="mailto:${place.email}">${place.email}</a></p>
    `;
}

function getDirection(destLat, destLng)
{
    console.log("in getDirection 1: ",destLat);
    console.log("in getDirection 2: ",destLng);
    navigator.geolocation.getCurrentPosition(function(position) {
        const my_location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        traceRoute(my_location, { lat: destLat, lng: destLng });
    }, showError);
}

function traceRoute(origin, destination) {
    const directionsService = new google.maps.DirectionsService();

    if(directionsRenderer)
    {
        directionsRenderer.setMap(null);
    }
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'  // travel modes: WALKING, BICYCLING
    };

    directionsService.route(request, function(result, status) {
        if (status === 'OK') 
            {
            directionsRenderer.setDirections(result);
            console.log("Directions traced successfully!", result);
        } 
        else 
        {
            console.error("Failed to retrieve directions: " + status);
        }
    });
}

function updateInfoWindowUI(place, markerLatLng) 
{
    console.log("in updateInfoWindowUI: ", markerLatLng.latitude, markerLatLng.longitude); 
    document.getElementById("infowindow").innerHTML = `
        <div class="infowindow-image-container">
            <img src="${place.image}" alt="${place.name}" class="infowindow-image" style="width: 100%; max-height: 200px; object-fit: cover; margin-bottom: 10px;">
        </div>
        <h5 class="card-title infowindow-font-format"><strong>${place.name}</strong></h5>
        <p class="card-text infowindow-font-format">${place.content}</p>
        <p class="infowindow-font-format"><strong>Address:</strong> ${place.address}</p>
        <p class="infowindow-font-format"><strong>Phone:</strong> ${place.phone}</p>
        <p class="infowindow-font-format"><strong>Email:</strong> <a href="mailto:${place.email}">${place.email}</a></p>
        <button class="btn btn-primary-route" id="get-directions">Get Directions</button>
    `;

    document.getElementById('get-directions').addEventListener("click", function() {
        getDirection(markerLatLng.latitude, markerLatLng.longitude);
    });
}

function getLocation() 
{
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } 
    else 
    {
        window.alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) 
{
    my_latitude = position.coords.latitude;
    my_longitude = position.coords.longitude;
    let my_location = {lat: my_latitude, lng: my_longitude};

    const my_location_marker = new google.maps.Marker({
        map,
        position: my_location,
        title: "You are here",
        icon: {
            url: "http://maps.google.com/mapfiles/kml/shapes/ranger_station.png"
        }
    });
}

function showError(error) 
{
    switch (error.code) 
    {
        case error.PERMISSION_DENIED:
            window.alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
            window.alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            window.alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
            window.alert("An unknown error occurred.")
            break;
    }
}

function removeMarkers(array)
{
    for(let i = 0; i < array.length; i++)
    {
        array[i].map = null;   
    }
}

window.initMap = initMap;

document.getElementById("add_hotels").addEventListener("click", function(){
    removeMarkers(markersArray);
    markersArray = [];
    setHotelMarkers();
});

document.getElementById("add_restaurants").addEventListener("click", function(){
    removeMarkers(markersArray);
    markersArray = [];
    setRestaurantMarkers();
});

document.getElementById("add_waterfalls").addEventListener("click", function(){
    removeMarkers(markersArray);
    markersArray = [];
    setWaterfallMarkers();
});

document.getElementById("add_my_location").addEventListener("click", function(){
    getLocation();
});

document.getElementById("find_my_address").addEventListener("click", function(){
    let address = document.getElementById("floatingInput").value;
    if(address != "")
    {
        removeMarkers(userMarkersArray);
        userMarkersArray = [];
        console.log("in the event ", address);
        let icon = "http://maps.google.com/mapfiles/kml/shapes/ranger_station.png";
        getCoordinatesAndSetMarker(address, icon, true);
        document.getElementById("floatingInput").value = "";
    }
    else
    {
        window.alert("Enter an address to place the marker on the map.");    
    }
});

window.getDirection = getDirection;

window.addEventListener('resize', () => {
    google.maps.event.trigger(map, "resize");
});

