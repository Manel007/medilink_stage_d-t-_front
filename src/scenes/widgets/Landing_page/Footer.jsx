import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <>
    <hr className="my-6 border-gray-300" />
    <footer className='border-t-2 border-gray-300 py-4 px-4'>
      <div className='grid lg:grid-cols-3 gap-8 text-[#494369]'>
        <div className='flex justify-between md:w-[75%] my-6'>
          <FaFacebookSquare size={30} />
          <FaInstagram size={30} />
          <FaTwitterSquare size={30} />
          <FaGithubSquare size={30} />
        </div>
        <div className="col-span-3 lg:col-span-1 text-center text-gray-300"  >
          Copyright © 2024 Medilink developed by : 3D wave
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
