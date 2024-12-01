exports = async function(payload) {
  const cluster = context.services.get("mongodb-atlas");
  const db = cluster.db("test_db");
  const usersCollection = db.collection("users");
  const serialized = payload.body.text();
  const body = JSON.parse(serialized);

  // Validate the incoming data
  if (!body.name || !body.email || !["active", "inactive"].includes(body.status)) {
    return {
      status: 400,
      data: { error: "Invalid user data" },
    };
  }

  const user = {
    name: body.name,
    email: body.email,
    status: body.status,
  };

  await usersCollection.insertOne(user);

  return {
    status: 201,
    data: { message: "User added successfully" },
  };
};