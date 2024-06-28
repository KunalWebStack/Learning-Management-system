import React from "react";
import { FaStar } from "react-icons/fa";
import { Container, Rating } from "./RatingStyles";

const Rate = () => {
  const staticRating = 4;

  return (
    <Container>
      {[...Array(5)].map((_, index) => {
        const givenRating = index + 1;

        return (
          <label key={givenRating}>
            <Rating>
              <FaStar
                color={givenRating <= staticRating ? "#ffc221" : "rgb(192, 192, 192)"}
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};

export default Rate;
