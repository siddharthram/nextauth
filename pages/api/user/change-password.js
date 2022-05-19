import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {

    if (req.method !== 'PATCH') {
        res.status(400).json({message: "Must be PATCH method"});
        return;
    }

    const session = await getSession({ req: req});

    if ( !session ) {
        res.status(401).json({message: 'must be authenticated'});
        return;
    } 

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connectToDatabase();
    const usersCollection =  client.db().collection('users');

    const user = await usersCollection.findOne({email: userEmail});
    if (!user) {
        res.status(404).json({message: "user not found"});
        client.close();
        return;
    }
    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(oldPassword,currentPassword);

    if (! passwordsAreEqual) {
        res.status(422).json({message: "password not correct"});
        client.close();
        return;
    }

    const hashedPassword = hashPassword(newPassword);
    const result = await usersCollection.updateOne({email: userEmail}, {$set: {password: hashedPassword}});


    client.close();

}

export default handler;