export = {
  // transport: `smtp://${process.env.MAIL_USER}:${process.env.MAIL_PASSWORD}@${process.env.MAIL_HOST}:${process.env.MAIL_PORT}`,
  transport: {
    host: 'localhost',
    port: 2500,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: 'username',
      pass: 'password',
    },
  },
  defaults: {
    from: 'admin@hh17.pl',
  },
};
