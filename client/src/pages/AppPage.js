import React, { useEffect, useState } from "react";

// Libraries
import axios from "axios";
import { Button, Container } from "react-bootstrap";
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

  const calibrationTimes = 10;

  const dislike = async (e) => {
    if (count < 10) {
      const weightsRes = await axios.post(
        "http://localhost:5000/api/prediction/update-weights",
        {
          weightMatrix,
          cuisineIndex,
          calibrationValue: -1,
        }
      );

      setWeightMatrix(weightsRes.data.weightMatrix);
      const newWeightMatrix = weightsRes.data.weightMatrix;
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

      setCount(() => count + 1);
    } else {
      const restaurantsRes = await axios.post(
        "http://localhost:5000/api/prediction/restaurant-choice-array",
        {
          weightMatrix,
        }
      );

      console.log(restaurantsRes.data);
    }
  };

  const like = async (e) => {
    if (count < 10) {
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

      setCount(() => count + 1);
    } else {
      const cuisinesRes = await axios.post(
        "http://localhost:5000/api/prediction/restaurant-choice-array",
        {
          weightMatrix,
        }
      );

      setCuisineArray(cuisinesRes.data);
    }
  };

  useEffect(() => {
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
      <div className="row" id="slides">
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
    </Container>
  );
}
