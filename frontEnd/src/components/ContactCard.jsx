import { FaGithubSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';
import { IconContext } from 'react-icons';

import '../styles/contactCard.css';

export default function ContactCard({ profileImg, profileName }) {
  return (
    <div className="profile-container">
      <img src={profileImg} />
      <p>{profileName}</p>
      <div className="socialMedia-container">
        <IconContext.Provider value={{ size: '50px', className: 'icon-class' }}>
          <FaGithubSquare />
          <FaLinkedin />
          <FaTwitterSquare />
        </IconContext.Provider>
      </div>
    </div>
  );
}
