const express = require('express')
const mongoose = require('mongoose');

const app = express()
const port = process.env.PORT || 3000



const oServices = JSON.parse(process.env.VCAP_SERVICES)
console.log(process.env.VCAP_SERVICES)
let sMongoPath 

try{
	sMongoPath = oServices.mlab[0].credentials.uri  
} catch(oError){
	sMongoPath = 'mongodb://localhost/micro-a'
}

console.log(sMongoPath)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

mongoose.connect(sMongoPath).then(() => {
	console.log("conectado com o banco")
	const Times = mongoose.model('Time', { nome: String });

	app.get('/', (req, res) => res.send('Olá!'))

	app.get('/times', (req, res) => 
	{		

		// executing a query explicitly
		var query = Times.find({})
		query.exec((err, docs) => {
			if(err){
				res.json(err)
				return
			}
			res.json(docs)

		});


	})

});
