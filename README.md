## The steps to run the app:

- npm install
- npm start

## THE APIS:

#### To register an account

**Post** http://localhost:45204/api/app/register
**_With a body of the following form:_**

```json
{
    "username" : < The username to register >,
    "password": < The password to resgister >,
}
```

#### To login

**Post** http://localhost:45204/api/app/login
**_With a body of the following form:_**

```json
{
    "username" : < The username to login >,
    "password": < The password to login >,
}
```

**_The result returned when login successfully will be in the form:_**

```json
{
    "accessToken" : < The token to use to determine access rights >,
    "refreshToken": < The token to use to refresh tokens upon expiration>,
}
```

#### To refresh a token

**Post** http://localhost:45204/api/app/refreshToken

```json
{
    "refreshToken": < Your refresh token >
}
```

### APIs that User account type is allowed to use

- #### Note: The api below all need to send with the token received after login to have access! +

#### To create new a PKI:

**Get** http://localhost:45204/api/pki/createPKI

#### To sign a message:

**Post** http://localhost:45204/api/pki/sign
**_With a body of the following form:_**

```json
{
    "message" : < Message to sign >,
    "publicKey": < Your public key >,
    "privateKey": < Your private key >
}
```

**_Example:_**
![alt text](./img/sign.png)
**_The result returned when signing successfully will be in the form:_**
![alt text](./img/result.png)

#### To verify the signature on a message

**Post** http://localhost:45204/api/pki/verify  
**_With a body of the following form:_**

```json
{
    "SIGN": {
        "message": < Message >,
        "publicKey": < Your public key >,
        "signature": < The signature on message >
    }
}
```

**_Example:_**
![alt text](./img/verify.png)

### APIs that only the Administrator account type is allowed to use

#### To get list user

**Get** http://localhost:45204/api/user/getUsers

#### To modify permission of an user

**Post** http://localhost:45204/api/user/mRole

#### To delete an user

**Post** http://localhost:45204/api/user/delete/ + < Id of the user to delete >

#### To get list of PKIs:

**Get** http://localhost:45204/api/pki/getAll

#### To revoke a PKI:

**Post** http://localhost:45204/api/pki/revoke  
**_With a body of the following form:_**

```json
{
    "publicKey" : < The public key needs to be revoked >
}
```

**_Example:_**
![alt text](./img/img1.png)
