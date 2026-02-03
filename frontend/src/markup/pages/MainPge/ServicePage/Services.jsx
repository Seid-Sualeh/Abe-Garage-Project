import Appointment from "../../../components/OtherComponents/CTA/Appointment";
import PageTitle from "../../../components/OtherComponents/PageTitle/PageTitle";
import Service from "../../../components/MainComponents/Service/Service";
import Video2nd from "../../../components/OtherComponents/Video/Video2nd";
import WhyChoose from "../../../components/OtherComponents/WhyChoose/WhyChoose";

function Services() {
  return (
    <>
      <PageTitle title="Services" pageName="Services" />
      <Service />
      <WhyChoose />
      <Video2nd />
      <Appointment />
    </>
  );
}

export default Services;
