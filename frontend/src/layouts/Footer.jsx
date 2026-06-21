import { FaGithub, FaEnvelope, FaLeaf } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full h-13 bg-gray-900 text-white flex items-center justify-between px-4 border-t border-gray-700">
      <div className="flex items-center gap-2">
        <FaLeaf className="text-green-400 text-sm" />
        <span className="text-xs font-semibold">EcoMetricAI</span>
      </div>

      <p className="text-[10px] text-gray-400">
        Built by <span className="text-white">Jeevan</span>
      </p>

      <div className="flex items-center gap-3">
        <a
          href="mailto:ecometricai2@gmail.com"
          className="text-gray-300 hover:text-white transition"
        >
          <FaEnvelope className="text-sm" />
        </a>

        <a
          href="https://github.com/jeevan-sathish/EcoMetricAI.git"
          target="_blank"
          className="text-gray-300 hover:text-white transition"
        >
          <FaGithub className="text-sm" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
