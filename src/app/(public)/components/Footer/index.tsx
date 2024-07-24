'use client';
// Components
import useComponents from '@/share/components';


const Footer = () => {

  const { Typography } = useComponents()

  return (
    <footer className="bg-primary">
        <Typography variant="p" className="text-white text-center py-3">
        © Copyright 2023
      </Typography>
    </footer>
  );
};

export default Footer;
