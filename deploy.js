const dotenv = require('dotenv')
const FtpDeploy = require('ftp-deploy')
const path = require('path')

dotenv.config()
const ftp = new FtpDeploy()

if (process.env.FTP_USER && process.env.FTP_PASS && process.env.FTP_HOST) {
  const config = {
    user: process.env.FTP_USER,
    password: process.env.FTP_PASS,
    host: process.env.FTP_HOST,
    port: 21,
    localRoot: path.join(__dirname, 'dist'),
    remoteRoot: '/',
    include: ['*.html', '*.css'],
    deleteRemote: true,
    forcePasv: true,
  }

  ftp
    .deploy(config)
    .then(result => console.log(`Finished: ${result}`))
    .catch(error => console.log(error))
} else {
  console.error('Couldn\'t find .env file')
}
