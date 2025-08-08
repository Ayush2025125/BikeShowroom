import React, { useEffect, useState } from "react";
import BikeCard from "./ui/BikeCard";

const BikeList = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bikes/top3"); 
        const data = await res.json();
        setBikes(data);
      } catch (err) {
        console.error("Error fetching bikes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  if (loading) return <p>Loading bikes...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {bikes.map((bike) => (
        <BikeCard
          key={bike._id}
          name={bike.name}
          price={bike.price}
          image={bike.image}
        />
      ))}
    </div>
  );
};

export default BikeList;
