import { dbConnect } from "./dbConnect.js";

export async function createUser(req, res) {
    const db = dbConnect();
    const doc = await db.collection('users').add(req.body)
        .catch(err => res.status(500).send({success: false, message: err}));
    res.status(201).send({success: true ,message:'User created: ' + doc.id });
}

export async function getAllusers(req,res) {
    const db = dbConnect();
    const collection = await db.collection('users').get()
    .catch(err => res.status(500).send({ success: false, message: err}));
    const users = collection.docs.map(doc => {
        let user = doc.data()
        user.uid = doc.id
        return user
    })
    res.send(users)
}

// //using async await 
// const doc = await db.collection('users').add(req.body);
// res.status(201).send({success: true ,message:'User created' + doc.id })}

// using await.catch 