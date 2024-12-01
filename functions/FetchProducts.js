exports = async function() {
  const cluster = context.services.get("mongodb-atlas");
  const db = cluster.db("test_db");
  const productsCollection = db.collection("products");

  return productsCollection.find({}).toArray();
};