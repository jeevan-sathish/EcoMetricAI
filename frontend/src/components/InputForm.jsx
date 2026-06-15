import { useEffect, useState } from "react";
import api from "@/services/api";
import useGetBrandco2 from "@/store/useGetBrandco2";
import useCarStore from "@/store/useCarStore";

export default function InputForm() {
  const { setCars } = useCarStore();
  const { setBrandCo2, setMinCo2 } = useGetBrandco2();

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  const [form, setForm] = useState({
    brand: "",
    model: "",
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await api.post("/brands");
        setBrands(response.data.brands || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchModels = async () => {
      if (!form.brand) {
        setModels([]);
        return;
      }

      try {
        const response = await api.post("/models", {
          brand: form.brand,
        });

        setModels(response.data.models || []);
      } catch (error) {
        console.error("Error fetching models:", error);
        setModels([]);
      }
    };

    fetchModels();
  }, [form.brand]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "brand" ? { model: "" } : {}),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      const response = await api.post("/filterData", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCars(response.data.data1 || []);
      setBrandCo2(response.data.data2 || []);
      setMinCo2(response.data.data3?.[0] || {});

      console.log("Cars:", response.data.data1);
      console.log("Brand CO2:", response.data.data2);
      console.log("Min CO2:", response.data.data3?.[0]);
      console.log("Suggestion:", response.data.suggestion);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto p-6 space-y-4 bg-black border border-gray-500 shadow rounded-bl-2xl rounded-br-2xl"
    >
      <select
        name="brand"
        value={form.brand}
        onChange={handleChange}
        className="w-full p-2 border border-gray-500 text-white rounded"
      >
        <option value="" className="text-white bg-gray-800 ">
          Select Brand
        </option>

        {brands.map((brand) => (
          <option key={brand} value={brand} className="text-black">
            {brand}
          </option>
        ))}
      </select>

      <select
        name="model"
        value={form.model}
        onChange={handleChange}
        disabled={!form.brand}
        className="w-full p-2 border border-gray-500 text-white rounded"
      >
        <option value="" className="text-white bg-gray-800 ">
          Select Model
        </option>

        {models.map((model) => (
          <option key={model} value={model} className="text-black">
            {model}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
}
