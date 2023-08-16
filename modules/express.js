const express = require('express');

const UserModel = require('../src/models/user.model');

const app = express();

// Middleware: vai ser chamado antes de cada requisição
app.use(express.json());

// next no Middleware é para prosseguir, senão ficará travado
app.use((req, res, next) => {
    console.log(`Request Type: ${req.method}`);
    console.log(`Content Type: ${req.headers['content-type']}`);
    console.log(`Date: ${new Date()}`);
    
    next();
});

// usar ejs
app.set('view engine', 'ejs');

app.set('views', 'src/views');

app.get('/views/users', async (req, res) => {
    const users = await UserModel.find({});
    res.render('index', {users});
});

/*app.get('/home', (req, res) => {
    res.contentType('application/html');
    res.status(200).send("<h1>Hello World</h1>");
});*/

// get pega a lista do banco
app.get('/users', async (req, res) =>{
    try {
        //find({}) - retorna tudo; find({firtName:'Aden'}) - retorna só que foi pedido
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// pegar pelo id no BD
app.get('/users/:id', async (req, res) =>{
    try {
        const id = req.params.id;

        const user = await UserModel.findById(id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

// post cria alguma coisa para o banco
app.post('/users', async (req, res) => {
    try {
        const user = await UserModel.create(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// atualizar dados no banco
    // patch - mudar apenas algumas informações, put - mudar todas as informações
app.patch('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndUpdate(id, req.body, {new: true});
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// deletar um dado do banco pelo id
app.delete('/users/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndRemove(id);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const port = 8080;

app.listen(port, () => console.log(`Rodanddo Express na porta ${port}!`));