import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID,
      secretID: process.env.GOOGLE_CLIENT_SECRET,
    },
    db: 'mongodb://localhost/chat',
};

export default config;