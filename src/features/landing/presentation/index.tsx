import { useEffect, useState } from 'react';
import { HeroSection, CTASection, Footer, FeaturesGrid, CodeSection, PerformanceGraph } from './partials';
import { useUseCases } from '@/shared/hooks/use_use_cases';

const LandingPage = () => {
  const { getCodeSnippet } = useUseCases();

  const [codeSnippet, setCodeSnippet] = useState<string>("");

  useEffect(() => {
    getCodeSnippet.execute().then((snippet) => {
      setCodeSnippet(snippet.content);
    });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-red-50">
      <HeroSection />

      <FeaturesGrid />

      <CodeSection code={codeSnippet} language='python'/>

      <PerformanceGraph />

      <CTASection />

      <Footer />
    </div>
  );
};

export default LandingPage;