import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");
  const [car, setCar] = useState({
    brand: "",
    model: "",
    fueltype: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function get_data() {
    try {
      const response = await axios.post(
        "http://localhost:8000/filterData",
        car,
      );
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div>
      <input
        type="text"
        placeholder="enter car brand"
        onChange={handleChange}
        name="brand"
        value={car.brand}
      />
      <input
        type="text"
        placeholder="enter car model"
        onChange={handleChange}
        name="model"
        value={car.model}
      />
      <input
        type="text"
        placeholder="enter car fueltype"
        onChange={handleChange}
        name="fueltype"
        value={car.fueltype}
      />
      <button onClick={get_data}>search</button>
      <p>{error}</p>
      {data &&
        data.map((ele, i) => (
          <ul key={i}>
            <li>{ele.brand}</li>
            <li>{ele.model}</li>
            <li>{ele.fueltype}</li>
            <li>{ele.co2emission}</li>
          </ul>
        ))}
    </div>
  );
};

export default Home;
