import { FaBrain, FaMapMarkerAlt, FaFileMedical, FaLock } from "react-icons/fa";

const features = [
  {
    icon: <FaBrain className="text-3xl text-blue-600" />,
    title: "AI Symptom Checker",
    desc: "Get intelligent suggestions based on your symptoms in seconds.",
  },
  {
    icon: <FaMapMarkerAlt className="text-3xl text-blue-600" />,
    title: "Nearby Clinics & Services",
    desc: "Find the closest verified clinics, pharmacies & emergency services.",
  },
  {
    icon: <FaFileMedical className="text-3xl text-blue-600" />,
    title: "Personal Health Records",
    desc: "Securely track your past symptoms, diagnoses & checkups.",
  },
  {
    icon: <FaLock className="text-3xl text-blue-600" />,
    title: "Privacy First",
    desc: "Your data is encrypted and never shared without your consent.",
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose NirogCare?</h2>
        <p className="text-gray-600 mb-12">Empowering you with technology-driven healthcare support.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-700 mt-4">{feature.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
