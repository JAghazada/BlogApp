const express = require('express')
const {Author,post} = require('./models')
const handlebars = require('express-handlebars')
const session =require('express-session')
const SessionFileStore= require('session-file-store')(session)
const flash = require('express-flash')
let app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// app.use((req,res,next)=>{
//     req.headers()
// })
app.use(flash())
app.use(session({
    secret:"ala bu pisik sohbeti deyil",
    name:'blogapp',
    store:new SessionFileStore({
        path:'./oursessions'
    })
}))
app.set('view engine','handlebars')
app.engine('handlebars',handlebars({
    defaultLayout:'main'
}))

app.get('/',async (req,res)=>{
    res.render('home',{
        authors: await Author.findAll({})
    });
})

app.post('/',async (req,res)=>{
    const {author,article,title} = req.body;
    try{
       var newpost = await post.create({
           author,
           content:article,
           title
       });
       req.flash('successMessage','post was created')
    }
    catch(err){
        res.redirect('/')
        console.error(err)
        req.flash('errorMessage','post was destroyed')
    }finally{
        res.redirect('/')
    }
})

app.listen(3000,(result=>{
    console.log('Workin!')
}))