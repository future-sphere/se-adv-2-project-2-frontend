import HeroSection from '../../components/HeroSection';
import Layout from '../../components/Layout';
import PerksSection from '../../components/PerksSection';
import TrendingSection from '../../components/TrendingSection';

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <Layout>
      <HeroSection />
      <TrendingSection />
      <PerksSection />
    </Layout>
  );
};

export default LandingPage;
