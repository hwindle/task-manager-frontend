import Login from '../components/auth/Login/Login';

const Landing = () => {
  return (
    <>
      <h1
        style={{
          margin: 0,
          textAlign: 'center',
          color: 'white',
          width: '100%',
          padding: '1rem',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
        }}>
        Task Manager
      </h1>
      <div className='landing-page'>
        <Login />
      </div>
    </>
  );
};

export default Landing;
