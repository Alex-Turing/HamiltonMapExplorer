Interactive Map Application

Description

This interactive map application allows users to explore specific locations, such as hotels, restaurants, and waterfalls, on an interactive Google Map interface. Users can search for custom addresses, view specific places of interest, and get directions to destinations from their current location. This project leverages the Google Maps API for rendering maps, adding markers, and plotting routes.
Project Status

This project is currently in development. Additional features and improvements are planned, including performance optimization and UI enhancements.
Features

    Interactive Markers: View locations like hotels, restaurants, and waterfalls on the map.
    Get Directions: Users can find directions from their current location to any marker on the map.
    User Geolocation: Allows users to view their current location on the map with a custom marker.
    Custom Address Search: Users can input an address and see it marked on the map.
    Dynamic UI Updates: Info windows provide detailed information about locations, such as addresses, phone numbers, and emails.
    Responsive Design: The map adjusts to different screen sizes and is responsive to window resizing.

Demo

You can access a live demo of this project here.
Technologies Used

    Google Maps JavaScript API
    JavaScript (ES6)
    HTML5
    CSS3
    Bootstrap (optional)

Getting Started

To run this project locally:

    Clone the repository:

    bash

git clone https://github.com/your-username/repo-name.git

Navigate to the project directory:

bash

    cd repo-name

    Open index.html in your web browser.

Prerequisites

    You need to replace the api_key in the code with your own Google Maps API key. You can get it from the Google Cloud Console.

Usage

    Click on the buttons to display different categories of places (hotels, restaurants, waterfalls).
    Use the input field to search for a custom address and place a marker.
    Click on any marker to view more information and get directions to that location from your current position.

Project Structure

├── index.html
├── css
│   └── styles.css
├── js
│   ├── initialLocationsInitializer.js
│   ├── hotelLocationsInitializer.js
│   ├── restaurantLocationsInitializer.js
│   ├── waterfallLocationsInitializer.js
│   └── script.js
└── README.md

Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

    Fork the repository.
    Create your feature branch:

    bash

git checkout -b feature/feature-name

Commit your changes:

bash

git commit -m 'Add some feature'

Push to the branch:

bash

    git push origin feature/feature-name

    Open a pull request.

License

This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgements

    Google Maps JavaScript API for making the interactive map possible.
