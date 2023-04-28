const express = require('express');

const path = require("path");

const port = 3000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


const contacts = [
    {
        name: "Neeraj Kumar",
        phone: 8019755437
    },
    {
        name: "Raghunnadh",
        phone: 9676907755
    },
    {
        name: "Sujatha",
        phone: 9912971437
    }
]

app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log("Error while fetching data from db");
            return;
        }
        res.render('home',{
            contact_list : contacts
        });
    })
})

app.get('/practice',function(req,res){
    return res.render('practice');
})

// app.post('/contact-list',function(req,res){
//     contacts.push({
//         name:req.body.Name,
//         phone: req.body.Phone
//     });
//     return res.redirect('/');

// })

app.post('/create-contact', function(req, res){
    
    Contact.create({
        name: req.body.Name,
        phone: req.body.Phone
    }, function(err, newContact){
        if(err){
            console.log('Error in creating a contact!')
            return;
        }
        // console.log('******', newContact);
        return res.redirect('back');
    })
})

app.get('/delete-contact/', function(req, res){

    let id = req.query.id
    // console.log(req.query.id);

    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })

})

app.listen(port, function(err){
    if(err){
        console.log("err")
    }else{
        console.log("succuessfully connected to port : 3000")
    }
});