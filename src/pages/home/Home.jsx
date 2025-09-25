import Header from '../../common/Header';
import MainVisualSwiper from './MainVisualSwiper';
import Footer from '../../common/Footer';
import QuickLinkSection from './QuickLinkSection';
import EventBannerSection from './EventBannerSection';
import TravelConvenienceSection from './TravelConvenienceSection';
import MemberBenefitSection from './MemberBenefitSection';
import PopularRouteSection from './PopularRouteSection';

function Home() {
    return(

        <>
        <Header />
        <MainVisualSwiper />
        <QuickLinkSection />
        <EventBannerSection />
        <TravelConvenienceSection />
        <MemberBenefitSection />
        <PopularRouteSection />
        <Footer/>
        </>
    )
}

export default Home;