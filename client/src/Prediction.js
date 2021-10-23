function predictWeights() {
    let CALIBRATION_TIMES = 10;
   
    const restaurantMap = [];
    restaurantMap[0] = "Chinese";
    restaurantMap[1] = "Mexican";
    restaurantMap[2] = "Italian";
    restaurantMap[3] = "Thai";
    restaurantMap[4] = "Indian";
    restaurantMap[5] = "Japanese";
    restaurantMap[6] = "Korean";
    restaurantMap[7] = "Greek";
    restaurantMap[8] = "Vietnamese";
    restaurantMap[9] = "Cuban";

    const weightMatrix = new Array(2,2,2,2,2,2,2,2,2,2);
    const totalWeight = 20;

    for (let i = 0; i < CALIBRATION_TIMES; i++) {
        let restaurantIndex = generateRandomCuisine(weightMatrix, totalWeight);

        // Display the image and wait for the user to choose and option thumbs up or thumbs down

        // If thumbs up, calibrationValue = 1, otherweise calibration = -1
        let calibrationValue = 1;
        weightMatrix[restaurantIndex] += calibrationValue; 
        totalWeight += calibrationValue;
    }

    let MAX_RESTAURANT_CHOICES = 10;
    // Returning an array of the first MAX_RESTAURANT_CHOICES restaurant choices 
    return returnRestaurantChioceArray(restaurantMap, weightMatrix, MAX_RESTAURANT_CHOICES);
}

function generateRandomCuisine(_weightMatrix, _totalWeight) {
    let randWeight = Math.floor(Math.random() * _totalWeight) + 1;

    let _restarurantIndex;
    for (let i = 0; i < 10; i++) {
        randWeight -= _weightMatrix[i];
        if (randWeight <= 0) {
            _restaurantIndex = i - 1;
            break;
        }
    }

    return _restarurantIndex;
}

function returnRestaurantChioceArray(_restaurantMap, _weightMatrix, _totalWeight, _MAX_RESTAURANT_CHOICES) {
    const restaurantChoiceArray = [];

    for (let i = 0; i < _MAX_RESTAURANT_CHOICES; i++) {
        restaurantChoiceArray[i] = restaurantMap[generateRandomCuisine(_weightMatrix, _totalWeight)];
    }
    
    return restaurantChoiceArray;
} 