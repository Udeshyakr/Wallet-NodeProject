# Wallet-NodeProject
Project base on nodeJS, ES6 and RestAPI

# .env - SMTP services
  `SMTP_MAIL = <your-email>
  SMTP_PASSWORD = <your-password>
  SMTP_SERVICE = gmail`
  
# .env - cookie and JWT
COOKIE_EXPIRE = 
JWT_SECRET = 
JWT_EXPIRE=

# GET: all the users in the database:
base_url = http://localhost:5500
{{base_url}}/api/

# POST: Signup new user and get some amount credited.
  {{base_url}}/api/signup
{
    "email": "xyz@gmail.com",
    "username": "xyz",
    "password": "xyz"

}

# POST: Login with the email
    {{base_url}}/api/login
{
    "email": "xyz@gmail.com"
}

# POST: transfer the amount to the user.
# Reciepient email to transfer the amount
    {{base_url}}/api/transferAmount
{
    "email": "@gmail.com",
    "amount": 200
}
