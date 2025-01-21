import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Home Page</h1>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2>I AM A PET SITTER</h2>
          <img
            src="https://via.placeholder.com/150" // Replace with your pet sitter image URL
            alt="Pet Sitter"
            style={styles.image}
          />
          <Link to="/login">
            <button style={styles.button}>REGISTER AS A PET SITTER</button>
          </Link>
        </div>
        <div style={styles.card}>
          <h2>I AM A PET OWNER</h2>
          <img
            src="https://via.placeholder.com/150" // Replace with your pet owner image URL
            alt="Pet Owner"
            style={styles.image}
          />
          <button style={styles.button}>REGISTER AS A PET OWNER</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    height: '100vh',
  },
  header: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    width: '300px',
    textAlign: 'center' as const,
  },
  image: {
    width: '100%',
    maxWidth: '200px',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#ff7043',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
    marginTop: '1rem',
  },
};

export default HomePage;
