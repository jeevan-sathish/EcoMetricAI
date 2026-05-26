import useEmissionStore from "@/store/useEmissionStore";

const Home = () => {
  const { emissions, setEmissions } = useEmissionStore();
  return <div>Home</div>;
};

export default Home;
