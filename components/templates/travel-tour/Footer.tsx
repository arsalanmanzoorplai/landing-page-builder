import { FaFacebook, FaTwitter } from "react-icons/fa";

const pageLinks = [
  { id: 1, url: "#home", text: "home" },
  { id: 2, url: "#about", text: "about" },
  { id: 3, url: "#services", text: "services" },
  { id: 4, url: "#tours", text: "tours" },
];
const socialLinks = [
  { id: 1, url: "https://www.facebook.com", icon: <FaFacebook /> },
  { id: 2, url: "https://www.twitter.com", icon: <FaTwitter /> },
];

const Footer = () => {
  return (
    <footer className='section bg-grey-1 text-center pl-8 pr-8'>
      {/* page links */}
      <ul className='flex justify-center mb-6 flex-wrap'>
        {pageLinks.map((link) => {
          const { id, url, text } = link;
          return (
            <li key={id}>
              <a
                href={url}
                className='text-clr-white capitalize text-base mr-4 tracking-spacing transition-all duration-300 ease-linear hover:text-primary-5'
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>

      {/* social links */}
      <ul className='flex justify-center mb-6 flex-wrap'>
        {socialLinks.map((socialIcon) => {
          const { id, url, icon } = socialIcon;
          return (
            <li key={id} className='mr-4'>
              <a
                href={url}
                className='text-[2rem] text-clr-white transition-all duration-300 ease-linear hover:text-primary-5'
              >
                {icon}
              </a>
            </li>
          );
        })}
      </ul>
      <p className='capitalize tracking-spacing text-clr-white'>
        copyright &copy; Backroads travel tours company
        <span className='ml-2'>{new Date().getFullYear()}</span>. all rights
        reserved
      </p>
    </footer>
  );
};

export default Footer;
