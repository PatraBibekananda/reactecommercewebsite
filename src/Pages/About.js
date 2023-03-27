import HeroSection from '../Components/HeroSection';
import { useProductContext } from '../context/ProductContext';

const About = () => {
  const { myName } = useProductContext();
  const data = {
    name : "Ecommerce Store",
    img : "./Images/About-Us.jpg"
  }

  return (
    <>
      {myName}
      <HeroSection myData={data} />
    </>
  )
}



export default About;