const ENV = {
  LIVE: {
    TYPE: 1,
    API_HOST: 'https://leaguex.s3.ap-south-1.amazonaws.com/',
    IS_LIVE: true,
  },
  DEV: {
    TYPE: 2,
    API_HOST: 'http://localhost:5000/',
    IS_LIVE: false,
  },
};

export default ENV.LIVE;
