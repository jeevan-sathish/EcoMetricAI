import { useEffect, useState } from "react";
import api from "@/services/api";
import useGetBrandco2 from "@/store/useGetBrandco2";
import useCarStore from "@/store/useCarStore";
import { useNavigate } from "react-router-dom";
import useModelLoadingStore from "@/store/useModelLoadingStore";
import useDropdownCacheStore from "@/store/useDropdownCacheStore";

export default function InputForm() {
  const { modelLoading, setModelLoading } = useModelLoadingStore();
  const { setCars } = useCarStore();
  const { setBrandCo2, setMinCo2 } = useGetBrandco2();
  const {
    brands,
    setBrands,
    setModelsForBrand,
    hasModelsForBrand,
    getModelsForBrand,
  } = useDropdownCacheStore();

  const [toggleAlert, setToggleAlert] = useState(false);
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brand: "",
    model: "",
  });

  useEffect(() => {
    if (brands.length > 0) return;

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
    if (!form.brand) {
      setModels([]);
      return;
    }

    if (hasModelsForBrand(form.brand)) {
      setModels(getModelsForBrand(form.brand));
      return;
    }

    const fetchModels = async () => {
      try {
        const response = await api.post("/models", { brand: form.brand });
        const fetchedModels = response.data.models || [];
        setModelsForBrand(form.brand, fetchedModels);
        setModels(fetchedModels);
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

    if (!token) {
      setToggleAlert(true);
      setModelLoading(false);
      return;
    }

    try {
      setModelLoading(true);

      const response = await api.post("/filterData", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCars(response.data.data1 || []);
      setBrandCo2(response.data.data2 || []);
      setMinCo2(response.data.data3?.[0] || {});
      console.log(
        "------this is overall eco friendly model with low co2:",
        response.data.data3[0],
      );
    } catch (error) {
      console.error("Filter error:", error?.response?.data ?? error.message);
    } finally {
      setModelLoading(false);
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
        <option value="" className="text-white bg-gray-800">
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
        <option value="" className="text-white bg-gray-800">
          Select Model
        </option>
        {models.map((model) => (
          <option key={model} value={model} className="text-black">
            {model}
          </option>
        ))}
      </select>

      {!toggleAlert ? (
        <button
          type="submit"
          disabled={modelLoading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-300"
        >
          {modelLoading ? "loading..." : "Submit"}
        </button>
      ) : (
        <button
          onClick={() => navigate("/")}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-300"
        >
          Login Here
        </button>
      )}
    </form>
  );
}
