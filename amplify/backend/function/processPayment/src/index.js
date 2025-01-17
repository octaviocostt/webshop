const { AdminGetUserCommand,CognitoIdentityProviderClient } = require("@aws-sdk/client-cognito-identity-provider");
const USER_POOL_ID = "eu-west-3_kIlqwI7GI";
const stripe = require("stripe")("sk_test_51Q66tqHQr8p2iTv19XXQU5NRkykowig0DVtWkyGe9boPIq0xxNeCEptvhXpo9FrYu5mWQs6LXl6yxZE5wNFiZcUn00axyLSArT");
const cognitoClient = new CognitoIdentityProviderClient();


const getUserEmail = async (event) => {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: event.identity.claims.username
  };

  try{
    const command = new AdminGetUserCommand(params);
    const user = await cognitoClient.send(command);

    const emailAttr = user.UserAttributes.find(attr => attr.Name === 'email');
    return emailAttr ? emailAttr.Value: null;
  } catch(err){
    throw new Error (`Error fetching user email: ${err.message}`);
  }
};


exports.handler = async (event) => {
  try {
    const { id, cart, total, address, token } = event.arguments.input;
    const { username } = event.identity.claims;
    const email = await getUserEmail(event);

   const charge =  await stripe.charges.create({
      amount: total * 100,
      currency: "huf",
      source: token,
      description: `Order ${new Date()} by ${username} with ${email} email`
    });

    if (charge.status === "succeeded") {
        let status = 'SUCCESS'
        return { id, cart, total, address, username, email, status };
      }
      return'FAILED';
  } catch (err) {
    console.error("Stripe charge error", err.message);
    return 'FAILED';
  }
};