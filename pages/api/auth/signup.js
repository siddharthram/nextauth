import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";
import validator from "validator";

async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(500).json({ message: "Unsupported operation" });
    return;
  }

  const data = req.body;

  const { email, password } = data;

  if (!validator.isEmail(email)) {
    res.status(422).json({ message: "invalid email" });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  //check if user exists
  const existingUser = await db.collection('users').findOne({email: email});

  if (existingUser){
      res.status(422).json({message: "User already exists"});
      client.close();
      return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "Created User!" });
  client.close();
}

export default handler;
