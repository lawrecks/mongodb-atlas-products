exports = async function(status) {
  const cluster = context.services.get("mongodb-atlas");
  const db = cluster.db("test_db");
  const usersCollection = db.collection("users");

  return usersCollection.find({ status }).toArray();
};