import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.header, color: '#FC9453' }}>Welcome to PawPal</h1>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <img
            src="src/assets/home_petowner.png" // Replace with actual image URL
            alt="Pet Sitter"
            style={styles.image}
          /> 
        </div>
        <div style={styles.card}>
          <img
            src="src/assets/home_petsitter.png" // Fixed extra space in the file name
            alt="Pet Owner"
            style={styles.image}
          />
        </div>
      </div>
      <div style={styles.buttonContainer}>
        <Link to="/loginsitter" style={styles.link}>
          <button style={{ ...styles.button, ...styles.hoverEffect }}>I AM A PET SITTER</button>
        </Link>
        <Link to="/loginowner" style={styles.link}>
          <button style={{ ...styles.button, ...styles.hoverEffect }}>I AM A PET OWNER</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '2rem',
    backgroundImage: "url('src/assets/homepage_bg.png')", // Replace with actual background image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(5px)',
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
    marginBottom: '2rem',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    marginBottom: '2rem',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    padding: '1rem',
    width: '400px',
    textAlign: 'center' as const,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'transform 0.3s ease-in-out',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '300px',
    objectFit: 'cover' as const,
    borderRadius: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
  },
  button: {
    width: '400px', // Match button width with card width
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#FC9453', // Updated text color
    fontSize: '1.2rem',
    fontWeight: 'bold',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    transition: 'all 0.3s ease-in-out',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    textAlign: 'center' as const,
  },
  hoverEffect: {
    ':hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.05)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
    },
  },
  link: {
    textDecoration: 'none' as const,
  },
};

export default HomePage;
