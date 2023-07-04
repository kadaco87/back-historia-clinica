export default () => ({
  siteUrl: process.env.SITE_URL,
  db: process.env.DB_URI,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  emailConfig: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    from: process.env.MAIL_PORT,
    secure: process.env.MAIL_FROM,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    templatesFolder: process.env.MAIL_TEMPLATES_FOLDER,
  },
});
