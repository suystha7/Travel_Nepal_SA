import TravelNepalLogo from '@/assets/logo/travel-logo.webp'

const LogoSection = () => {
  return (
    <div className="w-auto h-18">
      <img
        src={TravelNepalLogo}
        alt="Good Travel"
        className="w-full h-full object-cover "
      />
    </div>
  );
};

export default LogoSection;
