import { useEffect, useState } from "react";
import api from "@/services/api";
import useGetBrandco2 from "@/store/useGetBrandco2";
import useCarStore from "@/store/useCarStore";
import { useNavigate } from "react-router-dom";
import useModelLoadingStore from "@/store/useModelLoadingStore";
import useDropdownCacheStore from "@/store/useDropdownCacheStore";
import Select from "react-select";

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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#111827",
      borderColor: state.isFocused ? "#22c55e" : "#4b5563",
      color: "white",
      minHeight: "46px",
      borderRadius: "8px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#22c55e",
      },
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: "#111827",
      borderRadius: "8px",
      overflow: "hidden",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#16a34a" : "#111827",
      color: "white",
      cursor: "pointer",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),

    input: (provided) => ({
      ...provided,
      color: "white",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
  };

  const brandOptions = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const modelOptions = models.map((model) => ({
    value: model,
    label: model,
  }));

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto p-6 space-y-4 bg-black border border-gray-900 shadow rounded-bl-2xl rounded-br-2xl"
    >
      <Select
        options={brandOptions}
        value={brandOptions.find((option) => option.value === form.brand)}
        onChange={(selected) =>
          setForm({
            ...form,
            brand: selected ? selected.value : "",
            model: "",
          })
        }
        placeholder="Select Brand"
        styles={customStyles}
        classNamePrefix="react-select"
      />

      <Select
        options={modelOptions}
        value={modelOptions.find((option) => option.value === form.model)}
        onChange={(selected) =>
          setForm({
            ...form,
            model: selected ? selected.value : "",
          })
        }
        placeholder="Select Model"
        isDisabled={!form.brand}
        styles={customStyles}
        classNamePrefix="react-select"
      />

      {!toggleAlert ? (
        <button
          type="submit"
          disabled={modelLoading}
          className={`w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-300 ${modelLoading ? "hover:cursor-wait" : "hover:cursor-grab"}`}
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
