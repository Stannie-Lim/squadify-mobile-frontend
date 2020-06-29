# squadify-mobile-frontend

## yarn ##
## npm run start ##
#### should automatically open up a localhost page ####
#### you can either run on simulator ( open -a Simulator ) by clicking "run on ios simulator" ####
#### or download "expo" app on your phone app store then scan the QR code ####

No env file. Create a secrets.ts file in /src and add this: 

const API_KEY = ask for it
const SECRET_ACCESS_KEY = ask for it
const ACCESS_KEY_ID = ask for it
const REGION = 'us-east-2'
const API_URL = 'http://68.183.121.88:3000'

export {
  API_KEY,
  SECRET_ACCESS_KEY,
  ACCESS_KEY_ID,
  REGION,
  API_URL
}