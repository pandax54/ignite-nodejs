export default {
  jwt: {
    secret: process.env.JWT_SECRET as string || "2dad67f4ea49b2b7ff418594454011b068350c8b542d1cd61d1df3c6bb4f71ff",
    expiresIn: '1d'
  }
}
