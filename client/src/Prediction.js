function generateCuisine(weightMatrix) { // Returns index to random cuisine based on weights
    let totalWeight = calculateTotalWeight(weightMatrix);

    return generateRandomCuisine(weightMatrix, totalWeight);
}

function generateImageIndex(cuisineIndex) {  
    const cuisineImageCount = []; // Hardcoded implementation, TODO: dynamic to folder size
    cuisineImageCount[0] = 5;
    cuisineImageCount[1] = 5;
    cuisineImageCount[2] = 5;
    cuisineImageCount[3] = 5;
    cuisineImageCount[4] = 5;
    cuisineImageCount[5] = 5;
    cuisineImageCount[6] = 5;
    cuisineImageCount[7] = 5;
    cuisineImageCount[8] = 5;
    cuisineImageCount[9] = 5;
    let size = cuisineImageCount[cuisineIndex];
    let imageIndex = Math.floor(Math.random() * size);
    return imageIndex;
}

function updateWeights(weightMatrix, restaurantIndex, calibrationValue) {   
    weightMatrix[restaurantIndex] += calibrationValue; 

    return weightMatrix;    
}

function generateRandomCuisine(_weightMatrix, _totalWeight) {
    let randWeight = Math.floor(Math.random() * _totalWeight) + 1;
    
    let _restaurantIndex = 0;
    for (let i = 0; i < 10; i++) {
        randWeight -= _weightMatrix[i];
        if (randWeight <= 0) {
            _restaurantIndex = i;
            break;
        }
    }

    return _restaurantIndex;
}

function returnRestaurantChoiceArray(weightMatrix) {
    let MAX_RESTAURANT_CHOICES = 10;

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

    let totalWeight = calculateTotalWeight(weightMatrix);

    const restaurantChoiceArray = [];

    for (let i = 0; i < MAX_RESTAURANT_CHOICES; i++) {
        restaurantChoiceArray[i] = restaurantMap[generateRandomCuisine(weightMatrix, totalWeight)];
    }
    
    return restaurantChoiceArray;
}

function calculateTotalWeight(weightMatrix) {
    let totalWeight = 0;
    for (let i = 0; i < weightMatrix.length; i++) {
        totalWeight += weightMatrix[i];
    }
    return totalWeight;
}