const express = require('express');
const {v4 : uuidv4} = require("uuid")
const app = express();

app.use(express.json());
const customers = []

// Middlewares
function verifyIfExistsAccountCPF(request, response, next){
    const { cpf } =  request.headers; 

    const customer = customers.find(customer=> customer.cpf === cpf);

    if(!customer) {
        return response.status(400).json({error: "This customer not found"})
    } 
    // para repassar info para dentro de nossas rotas pelo middleware usaremos o request
    request.customer = customer;

    // prosseguir a operação/rota
    return next();
}

function getBalance(statement) {
    const balance =  statement.reduce((acc, operation) => {
        if (operation.type == "credit") {
            return acc + operation.amount
        } else {
            return acc - operation.amount
        }
    }, 0)

    return balance
}

// middleware para todas as rotas
// app.use(verifyIfExistsAccountCPF)

/**
 * Dados de criação de uma conta:
 * cpf - string
 * name - string
 * id - uuid
 * statement - array
 */


// criar uma conta
app.post('/account', (request, response) => {
    const { name, cpf } = request.body;

    customerAlreadyExists = customers.some(customer => customer.cpf === cpf);

    if (customerAlreadyExists) {
        return response.status(400).json({ error: "Customer already exists!"})
    }

    customers.push({
        name,
        cpf,
        id: uuidv4(), 
        statement: []
    })


    return response.status(201).send()
})

app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    return response.json(customer.statement)

})

app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { description, amount} = request.body

    const statementOperation = {
        description, 
        amount,
        type: "credit",
        created_at: new Date()
    }

    customer.statement.push(statementOperation)

    // customers.map(c => {
    //     if(c.name == customer.name) {
    //         return c.statement.push(statementOperation)
    //     }
    //     return c
    // })

    return response.json(customer.statement)
})

// saque
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { amount } = request.body;
    const balance = getBalance(customer.statement)

    if (balance < amount) {
        response.status(400).json({error: "Insufficient funds!"})
    }

    const statementOperation = {
        amount,
        type: "debit",
        created_at: new Date()
    }

    customer.statement.push(statementOperation)

    
    return response.status(201).send()
})

// procurar statement por data
app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    // procurar pelo dia independente da hora
    const dateFormat = new Date(date + " 00:00")

    // toDateString() === 10/10/2021
    const statements = customer.statement.filter((statement) => {
        console.log(statement.created_at.toDateString())
        console.log(new Date(dateFormat).toDateString())
        return statement.created_at.toDateString() === new Date(dateFormat).toDateString()
    })

    return response.json(statements)

})

app.put('/account',verifyIfExistsAccountCPF, (request, response) => {
    const {name} = request.body
    const { customer } = request;

    customer.name = name 

    return response.status(201).send()
})

app.get('/account',verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer)
    
})

app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    // splice (iniciar, quantos elementos(posição))
    customers.splice(customer, 1)

    return response.status(200).json(customers)
    // return response.json({message: "hello world"})
})

app.get('/', (request, response) => {
    return response.send("hello world")
    // return response.json({message: "hello world"})
})


// localhost:3000
app.listen(3000)