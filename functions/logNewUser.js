exports = async function(changeEvent) {
  const { fullDocument } = changeEvent;
  console.log(`New user added: ${JSON.stringify(fullDocument)}`);

  const cluster = context.services.get("mongodb-atlas");
  const db = cluster.db("test_db");
  const usersCollection = db.collection("users");

  // Example: Add a `createdAt` timestamp
  await usersCollection.updateOne(
    { _id: fullDocument._id },
    { $set: { createdAt: new Date() } }
  );
};