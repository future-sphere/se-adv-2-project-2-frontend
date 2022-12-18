import { useOutletContext } from 'react-router-dom';
import HeroSection from '../../components/HeroSection';
import Layout from '../../components/Layout';
import PerksSection from '../../components/PerksSection';
import TrendingSection from '../../components/TrendingSection';
import { Category } from '../../interfaces';

type Props = {};

const LandingPage = (props: Props) => {
  const { categories } = useOutletContext<{
    categories: Category[];
  }>();
  return (
    <>
      <HeroSection categories={categories} />
      <TrendingSection />
      <PerksSection />
    </>
  );
};

export default LandingPage;
