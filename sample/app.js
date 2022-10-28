const { response } = require('express')
let express = require('express')
let mongoose = require('mongoose')
let User = require('./modals/user')
let app = express()

mongoose.connect('mongodb://localhost:27017/sample', (err) => {
  console.log(err ? err : 'sucessfully connected')
})
// middelware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// route
app.post('/users', (req, res) => {
  //   console.log(req.body)
  User.create(req.body, (err, User, next) => {
    console.log(err, User)
    next(err)
    res.send(req.body)
  })
})

app.get('/users/:id', (req, res) => {
  let id = req.params.id
  User.findById(id, (err, User) => {
    res.json(User)
  })
})

app.get('/users', (req, res) => {
  User.findOne({ _id: '635b794835fb380069e29a90' }, (err, User) => {
    res.json({ User: User })
  })
})

app.get('/users', (req, res) => {
  User.findOne({ _id: '635b794835fb380069e29a90' }, (err, User) => {
    res.json(User)
  })
})

// Q. Update a user

// on PUT request on '/users/:id', update a user
// use Model.update
// use Model.updateOne
// use Model.findByIdAndUpdate(id)

app.put('/user', (req, res) => {
  User.updateOne(
    { name: 'user6' },
    { $set: { name: 'user6', email: 'user6@gmail.com' } },
    { new: true },
    (err, updated) => {
      res.send(updated)
    },
  )
})

app.put('/users/:id', (req, res) => {
  let id = req.params.id
  User.findByIdAndUpdate(id, req.body, { new: true }, (err, updateUser) => {
    res.send(updateUser)
  })
})

// Q. delete a user using Model.findByIdAndDelete()

// on DELETE request on '/users/:id'

app.delete('/users/:id', (req, res) => {
  let id = req.params

  User.deleteOne(id, (err, UserDelete) => {
    res.send('deleted')
  })
})

// error handle middelware

app.use((err, req, res, next) => {
  res.send(err)
})

app.listen(4000, () => {
  console.log('server listing port 4000')
})
