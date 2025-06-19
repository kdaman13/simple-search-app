const config = {
    dev: {
      API_URL: process.env.REACT_APP_API_URL
    },
    prod: {
      API_URL: process.env.REACT_APP_API_URL
    }
  };
  
  const getEnv = () => (process.env.NODE_ENV === 'production' ? config.prod : config.dev);
  
  export default getEnv;
  