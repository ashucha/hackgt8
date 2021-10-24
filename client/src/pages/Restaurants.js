import React from "react";

// Libraries
import { Card } from "react-bootstrap";

export default function Restaurants() {
  return (
    <div>
      {JSON.parse(localStorage.getItem("restaurantData")).forEach(
        (restaurant) => (
          <Card>{restaurant.name}</Card>
        )
      )}
    </div>
  );
}
