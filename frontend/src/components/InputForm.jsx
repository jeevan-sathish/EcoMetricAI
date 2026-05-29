import { brand, makeModelMap } from "../data/VehicleData";
import useGetBrandco2 from "@/store/useGetBrandco2";
import useCarStore from "@/store/useCarStore";
import api from "@/services/api";
import { useState } from "react";
// import axios from "axios";

export default function InputForm() {
  const { setCars } = useCarStore();
  const { setBrandCo2, setMinCo2 } = useGetBrandco2();

  const [form, setForm] = useState({
    brand: "",
    model: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "brand" ? { model: "" } : {}),
    }));
  }

  const models = form.brand ? makeModelMap[form.brand] || [] : [];

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(form);

    try {
      const response = await api.post("/filterData", form);

      setCars(response.data.data1);
      setBrandCo2(response.data.data2);
      setMinCo2(response.data.data3[0] || {});
      console.log(response.data.data3[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto p-6 space-y-4 bg-white shadow rounded"
    >
      <select
        name="brand"
        value={form.brand}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Brand</option>

        {brand.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      <select
        name="model"
        value={form.model}
        onChange={handleChange}
        disabled={!form.brand}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Model</option>

        {models.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
