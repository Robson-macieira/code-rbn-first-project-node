const express = require('express')
const uuid = require('uuid')
const port = 3000

const app = express()
app.use(express.json())//essa configuração tem que vir antes das rotas (se não ,não ira funcionar)

const users = []//nunca usar uma variavel como essa na vida real ,pois podemos perder todos os dados

const chekUserId = (request, response, next) => {

    const { id } = request.params

    const index = users.findIndex(user => user.id ===id)
    //findIndex localiza a posição de um user ou objeto
    
    if(index < 0){
    
        return response.status(404).json({message: "User not found"})
    //retornando aqui usuario nãp encontrado
    }
    
request.userIndex = index
request.userId = id

next()
}




app.get('/users', (request, response,) => {

  
return response.json(users)


})



//criando usuario
app.post('/users',(request, response,) => {
    const {name, age} = request.body

    //console.log(uuid.v4())
    const user = {id:uuid.v4(), name, age}
   
 //console.log(request.body) seria  assim
 users.push(user)
 return response.status(201).json( user)
 
 })


//fazendo update
 app.put('/users/:id', chekUserId, (request, response,) => {

 const {name, age} = request.body
const index = request.userIndex
const id = request.userId

const updateUser = {id, name, age}

users[index] = updateUser

 return response.json(updateUser)
 
 })
 



 app.delete('/users/:id', chekUserId,(request, response,) => {

    
    const index = request.userIndex

   

users.splice(index,1)

 return response.status(204).json()
 
 
 })
 
 















 
app.listen(port, () => {

    console.log(`🚀🚀server started on port ${port}`)
})