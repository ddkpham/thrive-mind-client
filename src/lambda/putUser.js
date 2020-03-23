const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context, callback) => {
  const {
    username,
    callerContext: { clientId },
    request: {
      userAttributes: {
        name,
        phone_number,
        family_name,
        email,
        "custom:is_seeking": is_seeking
      }
    }
  } = event;

  const params = {
    TableName: "healthcareservice-patient",
    Item: {
      pid: clientId,
      first_name: name,
      user_name: username,
      last_name: family_name,
      email_address: email,
      phone: phone_number,
      is_seeking: is_seeking === "true" ? true : false
    }
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify("User Inserted!")
  };

  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1"
  });
  try {
    const data = await documentClient.put(params).promise();
    console.log("exports.handler -> data", data);
  } catch (err) {
    console.log(err);
    response.statusCode = 500;
    response.body = JSON.stringify("USER INSERTION ERROR");
  }

  callback(null, event);
};
