import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

//GET - Lista todos os dados ( isso tudo tem como objetivo settar o GET)
router.get("/",async (req, res) => {
    let collection = await db.collection("records");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});


//GET - Lista por ID (isso aqui, especificamente essa rota vai setar o GET pra mostrar os dados todos ordenados por ID)
router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = {_id: new ObjectId(req.param.id)};
    let result = await collection.findOne(query);

    if ( !result ) res.send("Não Achou").status(404);
    else res.send(result).status(200);
});


//POST - Inserindo dadso no Banco ( essa coisarada inteira tem como proposito settar o POST no banco de dados)
router.post("/", async (req, res) => {
    let newDocument = {
        name: req.body.name,
        position: req.body.positiion,
        level: req.body.level,
    }
    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
})


//PATCH - Atualizar dados por ID ( essa parte toda é responsável por settar a rota de PATCH)
router.patch("/:id",async(req,res) => {
    const query = { _id: new ObjectId(req.params.id)};
    const updates = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);

    res.send(result).status(200);
});


//DELETE - Deleção de dados ( essa parte toda é responsável por settar a rota de DELETE)
router.delete("/:id", async (req, res) => {
    const query = { _id: new ObjectId(req.params.id)};

    const collection = db.collection("records");
    let result = await collection.deleteOne(query);

    res.send(result).status (200);
});


export default router;
