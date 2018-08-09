import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import volleyball from "volleyball"
import cors from "cors"


const app = express();
const {PORT, DBUrl} = process.env;
const options = {promiseLibrary:Promise, useNewUrlParser:true};
const db = mongoose.connection;

//volleyball informe en direct
app.use(volleyball)
//ecrit les bon headers (utile pour fetch)
app.use(cors())
//permet de recuper l'url pour les requettes
app.use(express.urlencoded({ extended: false }))

//express se connect a un port
app.listen(PORT, () => {
	console.log(`server listen ${PORT}`)
})

//connection base de donnee
mongoose.connect(DBUrl, options).then(
	() => { console.log('mongo works on ' + DBUrl) },
	err => { console.log(err) }
)

//model
const foodSchema = new mongoose.Schema({
	title: {type: String},
})
const Food = mongoose.model('meal', foodSchema)

//recuperer la base de donnees
app.get('/data', (req, res) => {
	Food.find({}, (err, data) => {
		if(err) console.log(err)
		res.json(data)
	})
})

//sauvegarder dans la base de donnee
app.post('/save', (req, res) => {
	const newFood = new Food(req.body)
	newFood.save((err, data) => {
		if(err) console.log(err)
		res.redirect("http://localhost:3000")
	})
})

//delete un id dans la base de donnee
app.get("/delet/:id", (req, res) => {
	Food.remove({_id:req.params.id}, (err) => {
		if(err) console.log(err)
		res.redirect("http://localhost:3000/")
	})
})