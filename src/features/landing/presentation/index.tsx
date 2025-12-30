import { useEffect, useState } from 'react';
import { HeroSection, CTASection, FeaturesGrid, CodeSection, PerformanceGraph, StatsCards } from './partials';
import { useUseCases } from '@/shared/hooks/use_use_cases';
import { Footer } from '@/shared/components';

const LandingPage = () => {
  const { getCodeSnippet } = useUseCases();

  const [codeSnippet, setCodeSnippet] = useState<string>("");

  useEffect(() => {
    const ph = async () => {
      const snippet = await getCodeSnippet.execute()
      setCodeSnippet(snippet.content);
    }

    ph();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-linear-to-br from-amber-50 via-white to-red-50">
      <HeroSection />

      <FeaturesGrid />

      <CodeSection code={codeSnippet} language='cpp'/>

      <PerformanceGraph />

      <StatsCards />

      <CTASection />

      <Footer />
    </div>
  );
};

export default LandingPage;