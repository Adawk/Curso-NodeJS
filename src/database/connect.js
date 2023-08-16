const mongoose = require('mongoose');

const connectToDatabase = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cursonodejs.ebcq8o4.mongodb.net/?retryWrites=true&w=majority`, (error) => {
        if(error){
            return console.log('Ocorreu um erro ao se conectar ao banco de dados: ', error);
        }

        return console.log('Banco de dados conectado com sucesso!');
    });
};

module.exports = connectToDatabase;