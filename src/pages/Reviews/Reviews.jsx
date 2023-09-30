import React, { useEffect, useState } from "react";

import CardTableReviews from "../../components/Cards/CardTableReviews";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:9000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }
  return (
    <>
      <CardTableReviews reviews={reviews} setReviews={setReviews} />
    </>
  );
};

export default Reviews;
