let database = {
  bars: [],
  reviews: [],
};

const getRandomNumber = () => `${Math.floor(Math.random() * 900000) + 100000}`;

export const createReview = (reviewData) => {
  const newReview = {
    ...reviewData,
    id: getRandomNumber(),
  };
  database.reviews.push(newReview);
  return newReview;
};

export const clear = () => {
  database = {
    bars: [],
    reviews: [],
  };
};
