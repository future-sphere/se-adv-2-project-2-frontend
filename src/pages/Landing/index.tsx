import HeroSection from '../../components/HeroSection';
import Layout from '../../components/Layout';
import PerksSection from '../../components/PerksSection';
import TrendingSection from '../../components/TrendingSection';

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <>
      <HeroSection />
      <TrendingSection />
      <PerksSection />
    </>
  );
};

export default LandingPage;
