import db from "../../../util/db.js"

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            let bodyObject = JSON.parse(req.body);
            let newTest = await db.collection("tests").insertOne(bodyObject);
            res.json(newTest.ops[0]);
            break;
        case "GET":
            const tests = await db.collection("tests").find({}).toArray();
            res.json({ status: 200, data: tests });
            break;
  }
}