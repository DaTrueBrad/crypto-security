let bcrypt = require('bcryptjs')

const users = []

module.exports = {
  login: (req, res) => {
    console.log('Logging In User')
    console.log(req.body)

    const { username, password } = req.body
    

    console.log('we got so far, to lose it all...')
    for (let i = 0; i < users.length; i++) {
      const existing = bcrypt.compareSync(password, users[i].password)
      if (users[i].username === username && existing) {
        console.log('it works!!')

        const usersToSendBack = {...users[i]}
        delete usersToSendBack.password
        
        return res.status(200).send(console.log(usersToSendBack))
      }
    }
    res.status(400).send("User not found.")
  },

  register: (req, res) => {
    const { username, email, firstName, lastName, password } = req.body
      
    for(let i = 0; i < users.length; i++){
      if(username === users[i].username){
        console.log('theres already a user')
        return res.status(200).send(console.log('theres already a user'))
      }
    }
    const salt = bcrypt.genSaltSync(5)
    const passHash = bcrypt.hashSync(password, salt)

    const newUser = {
      username,
      email,
      firstName,
      lastName,
      password: passHash
    }

    users.push(newUser)

    console.log('Registering User')
    console.log(newUser)

    // users.push(req.body)
    res.status(200).send(req.body)
  }
}