import Features from "@/components/Features";
import SymptomForm from "@/components/SymptomInput";
import NearbyClinics from "@/components/NearbyClinics";



export default function Home() {
  return (
    <main className="pt-28"> {/* 👈 Add enough top space to avoid overlap */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Welcome to NirogCare</h1>
        <p className="text-gray-600">Your AI-powered health navigator</p>
      </section>

      <SymptomForm />
      <NearbyClinics specialization=" ENT" />
      <Features />
    </main>
  );
}
