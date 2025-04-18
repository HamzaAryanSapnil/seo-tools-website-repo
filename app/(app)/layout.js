import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react'

const layout = ({children}) => {
  return (
    <div className="">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default layout
