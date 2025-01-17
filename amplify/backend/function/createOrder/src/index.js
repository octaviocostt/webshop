

const { v4: uuidv4 } = require("uuid");
const {DynamoDBClient} = require("@aws-sdk/client-dynamodb")
const {DynamoDBDocumentClient, PutCommand, BatchWriteCommand} = require("@aws-sdk/lib-dynamodb")
const client = new DynamoDBClient({region: 'eu-west-3'});
const documentClient = DynamoDBDocumentClient.from(client);

const ORDER_TABLE = "Order-broartdgvnf6jopjyaunmfgx7e-mywebstore";
const ORDER_TYPE = "Order";
const PRODUCT_ORDER_TABLE = "ProductOrder-broartdgvnf6jopjyaunmfgx7e-mywebstore";
const PRODUCT_ORDER_TYPE = "ProductOrder";

const createOrder = async (payload) => {
  const { order_id, username, email, total } = payload;
  var params = {
    TableName: ORDER_TABLE,
    Item: {
      id: order_id,
      __typename: ORDER_TYPE,
      customer: email,
      user: username,
      total: total,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
  };
  
  console.log(params);
  try {
    await documentClient.send(new PutCommand(params));
  } catch (err) {
    console.error("Error creating order:", err.message);
    throw new Error("Failed to create order");
  }
};

const createProductOrder = async (payload) => {
    const productOrders = payload.cart.map((cartItem) => ({
      PutRequest: {
        Item: {
          id: uuidv4(),
          __typename: PRODUCT_ORDER_TYPE,
          product_id: cartItem.id,
          order_id: payload.order_id,
          customer: payload.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    }));
  
    const params = {
      RequestItems: {
        [PRODUCT_ORDER_TABLE]: productOrders
      }
    };
  
    console.log("Creating product orders:", params);
  
    try {
      await documentClient.send(new BatchWriteCommand(params));
    } catch (err) {
      console.error("Error creating product orders:", err.message);
      throw new Error("Failed to create product orders");
    }
  };

/*
 * Get order details from processPayment lambda
 * Create an order
 * Link products to the order - Users can see the past orders and admins can view orders by user
 */
exports.handler = async (event) => {
  try {
    const payload = event.prev.result;
    payload.order_id = uuidv4();

    // create a new order
    await createOrder(payload);

    // links products with the order
    await createProductOrder(payload);

    return 'SUCCESS';
  } catch (err) {
    console.error("Error in createOrder Lambda:", err.message);
    return "FAILED";
  }
};
