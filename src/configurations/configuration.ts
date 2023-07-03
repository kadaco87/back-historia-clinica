export default () => ({
  dbConfig: {
    db: process.env.DB_URI,
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY,
});
