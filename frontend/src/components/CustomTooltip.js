const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const car = payload[0].payload;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg border border-gray-700 shadow-xl">
      <h3>{car.model}</h3>
      <p>CO₂: {car.co2emission}</p>
      <p>Fuel Type: {car.fueltype}</p>
      <p>Engine Size: {car.enginesize} L</p>
      <p>Cylinders: {car.cylinders}</p>
    </div>
  );
};

export default CustomTooltip;
