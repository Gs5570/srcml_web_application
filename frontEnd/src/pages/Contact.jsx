import Header from '../components/Header';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
//style
import '../styles/header.css';

import '../styles/contact.css';

import galeImg from '../../public/media/IMG_3962-2.png';
import cNewman from '../../public/media/download.jpeg';
import emailjs from '@emailjs/browser';

import ContactCard from '../components/ContactCard';
export default function Contact() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    emailjs
      .send('service_vd6y5sj', 'template_xp29hz1', data, 'gWegVq69n0_5K5NEU')
      .then(
        (result) => {
          console.log(result.text);
          console.log('message sent');
        },
        (error) => {
          console.log(error.text);
        }
      );
    reset();
  };
  return (
    <div>
      <Header />
      <h1>Contributors</h1>
      <div className="contact-container">
        <ContactCard profileImg={cNewman} profileName={'Christian Newman'} />
        <ContactCard profileImg={galeImg} profileName={'Galekwan Sango'} />
      </div>

      <div className="contact-form-container">
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Contact Form</legend>
            <label className="label-container">
              Full Name <input type="text" {...register('full-name')} />
            </label>
            <label className="label-container">
              Email <input type="text" {...register('email')} />
            </label>

            <label className="label-container">
              Message
              <textarea {...register('message')} />
            </label>
          </fieldset>
          <button type="submit">Send email</button>
        </form>
      </div>
    </div>
  );
}
