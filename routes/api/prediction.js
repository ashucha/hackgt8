const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/image", async (req, res) => {
  console.log("=====================Image==================");

  const { weightMatrix } = req.body;

  console.log(req.body);

  const totalWeight = calculateTotalWeight(weightMatrix);

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

  const cuisineIndex = generateRandomCuisine(weightMatrix, totalWeight);
  const cuisineName = restaurantMap[cuisineIndex];

  const files = fs.readdirSync(__dirname + "/../../public/" + cuisineName);
  const fileName = files[Math.floor(Math.random() * files.length)];
  const cuisinePath = `${cuisineName}/${fileName}`;
  const extIndex = fileName.indexOf(".");
  const foodName = fileName.substring(0, extIndex).split("_").join(" ");

  res.json({
    path: `http://localhost:5000/${cuisinePath}`,
    foodName,
    cuisineIndex,
  });
});

router.post("/generate-image-index", (req, res) => {
  const { cuisineIndex } = req.body;

  const cuisineImageCount = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5]; // Hardcoded implementation, TODO: dynamic to folder size
  let size = cuisineImageCount[cuisineIndex];
  let imageIndex = Math.floor(Math.random() * size);
  res.json({ imageIndex });
});

router.post("/update-weights", (req, res) => {
  console.log("=====================Update weights==================");

  const { weightMatrix, cuisineIndex, calibrationValue } = req.body;

  console.log(cuisineIndex, calibrationValue);

  weightMatrix[cuisineIndex] += calibrationValue;

  res.json(weightMatrix);
});

const generateRandomCuisine = (_weightMatrix, _totalWeight) => {
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
};

router.post("/restaurant-choice-array", (req, res) => {
  const { weightMatrix } = req.body;

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

  const totalWeight = calculateTotalWeight(weightMatrix);

  const restaurantChoiceArray = [];

  for (let i = 0; i < MAX_RESTAURANT_CHOICES; i++) {
    restaurantChoiceArray[i] =
      restaurantMap[generateRandomCuisine(weightMatrix, totalWeight)];
  }

  res.json(restaurantChoiceArray);
});

const calculateTotalWeight = (weightMatrix) => {
  let totalWeight = 0;
  for (let i = 0; i < weightMatrix.length; i++) {
    totalWeight += weightMatrix[i];
  }
  return totalWeight;
};

module.exports = router;
