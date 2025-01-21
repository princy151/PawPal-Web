import React from 'react';

const LoginPetSitter: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.leftContainer}>
        <h1 style={styles.welcomeText}>
          Welcome, <br />
          <span style={styles.highlight}>PET SITTER</span>
        </h1>
        <img
          src="https://via.placeholder.com/300" // Replace with your pet sitter illustration URL
          alt="Pet Sitter"
          style={styles.image}
        />
      </div>
      <div style={styles.rightContainer}>
        <img
          src="https://via.placeholder.com/150" // Replace with PawPal logo URL
          alt="PawPal Logo"
          style={styles.logo}
        />
        <form style={styles.form}>
          <label style={styles.label}>EMAIL</label>
          <input type="email" placeholder="Enter your email" style={styles.input} />
          <label style={styles.label}>PASSWORD</label>
          <input type="password" placeholder="Enter your password" style={styles.input} />
          <a href="#" style={styles.forgotPassword}>
            FORGOT PASSWORD
          </a>
          <button type="submit" style={styles.button}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as const,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f9f9f9',
    padding: '1rem',
  },
  leftContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  rightContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '2rem',
    marginLeft: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  welcomeText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
    textAlign: 'center' as const,
  },
  highlight: {
    color: '#ff7043',
  },
  image: {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    borderRadius: '10px',
  },
  logo: {
    width: '150px',
    height: 'auto',
    marginBottom: '2rem',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  label: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '1.5rem',
  },
  forgotPassword: {
    fontSize: '0.9rem',
    color: '#ff7043',
    textDecoration: 'none',
    marginBottom: '1.5rem',
    textAlign: 'right' as const,
  },
  button: {
    padding: '0.8rem',
    backgroundColor: '#ff7043',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textTransform: 'uppercase' as const,
  },
};

export default LoginPetSitter;
