import React, { useEffect, useState } from "react";

// Libraries
import axios from "axios";
import { Button, Card, CardGroup, Container } from "react-bootstrap";
import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import url from "../urls";

export default function AppPage() {
  const [weightMatrix, setWeightMatrix] = useState([
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  ]);
  const [imgURL, setImgURL] = useState("");
  const [cuisineIndex, setCuisineIndex] = useState(-1);
  const [foodName, setFoodName] = useState("");
  const [calibrationValue, setCalibrationValue] = useState(0);
  const [count, setCount] = useState(0);
  const [cuisineArray, setCuisineArray] = useState([]);
  const [restaurantArray, setRestaurantArray] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const dislike = async (e) => {
    if (count < 9) {
      const weightsRes = await axios.post(
        "http://localhost:5000/api/prediction/update-weights",
        {
          weightMatrix,
          cuisineIndex,
          calibrationValue: -1,
        }
      );

      setWeightMatrix(weightsRes.data);
      const newWeightMatrix = weightsRes.data;
      console.log("Res.data", weightsRes.data);
      console.log(newWeightMatrix);

      const imgRes = await axios.post(
        "http://localhost:5000/api/prediction/image",
        {
          weightMatrix: newWeightMatrix,
        }
      );

      setImgURL(imgRes.data.path);
      setFoodName(imgRes.data.foodName);
      setCuisineIndex(imgRes.data.cuisineIndex);
    } else {
      const cuisinesRes = await axios.post(
        "http://localhost:5000/api/prediction/restaurant-choice-array",
        {
          weightMatrix,
        }
      );

      setCuisineArray(cuisinesRes.data);

      console.log(cuisinesRes.data);

      const restaurantsRes = await axios.post(
        "http://localhost:5000/api/util/",
        {
          lat,
          lng,
          foodTypes: cuisinesRes.data,
        }
      );

      console.log(restaurantsRes.data);

      restaurantsRes.data.forEach((restaurant) => {
        setRestaurantArray([
          ...restaurantArray,
          JSON.parse(restaurant.siteName),
        ]);
      });
    }
    setCount(() => count + 1);
  };

  const like = async (e) => {
    if (count < 9) {
      const weightsRes = await axios.post(
        "http://localhost:5000/api/prediction/update-weights",
        {
          weightMatrix,
          cuisineIndex,
          calibrationValue: 1,
        }
      );

      setWeightMatrix(weightsRes.data);
      const newWeightMatrix = weightsRes.data;
      console.log("Res.data", weightsRes.data);
      console.log(newWeightMatrix);

      const imgRes = await axios.post(
        "http://localhost:5000/api/prediction/image",
        {
          weightMatrix: newWeightMatrix,
        }
      );

      setImgURL(imgRes.data.path);
      setFoodName(imgRes.data.foodName);
      setCuisineIndex(imgRes.data.cuisineIndex);
    } else {
      const cuisinesRes = await axios.post(
        "http://localhost:5000/api/prediction/restaurant-choice-array",
        {
          weightMatrix,
        }
      );

      setCuisineArray(cuisinesRes.data);

      console.log(cuisinesRes.data);

      const restaurantsRes = await axios.post(
        "http://localhost:5000/api/util/",
        {
          lat,
          lng,
          foodTypes: cuisinesRes.data,
        }
      );

      restaurantsRes.data.forEach((restaurant) => {
        console.log(JSON.parse(restaurant.siteName));
        setRestaurantArray([
          ...restaurantArray,
          JSON.parse(restaurant.siteName),
        ]);
      });
    }

    setCount(() => count + 1);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });

    (async () => {
      const res = await axios.post(
        "http://localhost:5000/api/prediction/image",
        {
          weightMatrix,
        }
      );

      setImgURL(res.data.path);
      setFoodName(res.data.foodName);
      setCuisineIndex(res.data.cuisineIndex);
    })();
  }, []);

  return (
    <Container id="app">
      {count < 10 ? (
        <div className="row p-5" id="slides">
          <button className="btn btn-default slide-btn col-2" onClick={dislike}>
            <BsHandThumbsDown size={40} />
          </button>
          <div className="cropped-img col-8">
            <div
              className="cropped-img-container text-light"
              style={{
                backgroundImage: `url(${imgURL}), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
              }}
            >
              <h3 className="cropped-img-caption">{foodName}</h3>
            </div>
          </div>
          <button className="btn btn-default slide-btn col-2" onClick={like}>
            <BsHandThumbsUp size={40} />
          </button>
        </div>
      ) : (
        <div className="row p-5" id="cards">
          {restaurantArray.forEach((restaurant) => (
            <Card>
              <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
