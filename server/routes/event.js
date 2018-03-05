const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const EventUser = require ("../models/Event-user");

////OBTENER TODOS LOS EVENTOS///// Funciona




router.get("/event/allshow", (req, res, next) => {
  console.log("entroooo back");
  Event.find({}, 
    function(err, p) {
    	User.populate(p, { path: "author" })


    .then(allMyEvents => res.status(200).json(allMyEvents))
    .catch(e => res.status(500).json(err))
      
    }); 
});


///OBTENER MIS EVENTOS//////Funciona
router.get("/event/myshow", function (req, res) {
  const UserId = req.user._id;
  console.log(UserId)
	Event.find({author:UserId}, function(err, p) {
    	User.populate(p, { path: "author" } ,function(err, p){
        res.status(200).json(p);
        }); 
    });
});
///////UNIRME AL EVENTO /////// Funciona
router.post("/event/join/:EventId", (req,res,next) => {
UserId = res.locals.user._id;
EventId = req.params.EventId;

console.log(UserId);
console.log(EventId);

Event.findByIdAndUpdate(
  EventId,
  { $push: {participantes:UserId }},
  {new:true}
  ).then(updatedEvent => res.status(200).json(updatedEvent))
   .catch(e=>
  res.status(500).json(e)
)

});





    // .then(MyEvents => res.status(200).json(MyEvents))
    // .catch(e => res.status(500).json(e));



////CREATE NEW EVENT//// //Funciona
router.post("/event/newEvent", (req, res, next) => {
  const author = res.locals.user._id;
  console.log(author);

  const deporte = req.body.deporte;
  const description = req.body.description;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const maxPart = req.body.maxPart;
  const date = req.body.time;
  var img = "";

  if(deporte==="Futbol 11"){
    img="http://imag.futbolia.com/articulos/medidas-oficiales-de-los-campos-de-futbol-segun-fifa.jpg"
  }else if (deporte==="Futbol Sala"){
    img="http://www1.pictures.zimbio.com/gi/Fernandao+Spain+v+Croatia+EoTFC6StXXgl.jpg"
  }else if (deporte==="Baloncesto"){
    img="http://www.oribeltzaportugalete.com/images/contenido/canastabaskettecnificacion18febrero.jpg"
  }else if (deporte==="Tenis"){
    img ="http://www.voxstadium.fr/wp-content/uploads/2016/11/tennis-660x400.jpg"
  }else if(deporte === "Padel"){
    img="http://blog.padel.decathlon.es/wp-content/uploads/2017/05/desgaste-padel.jpg"
  }else if(deporte === "Futbol 7"){
    img="https://entrenadorfutbol.es/wp-content/uploads/2016/02/P1090924-1280x640.jpg"
  }


  const newEvent = new Event({
    author,
    description,
    date,
    deporte,
    img,
    "location.lat": lat,
    "location.lng" : lng,
    maxPart,

  });

  newEvent.save()
  .then(evento => {
    console.log("Plan creado en la base de datos");
    const newEventUser = new EventUser({
        eventId: evento._id,
        userId: author
      });
      newEventUser.save().then(evento=>{console.log("EventUser creado")})
      .then(e => {
        console.log("Evento asociado a usuario");
        return res.status(200).json({ message: "Evento asociado a usuario y creado" });
      })
      .catch(e => {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
      });
  })
//   .catch(e => {
//     console.log(e);
//     return res.status(500).json({ message: "Something went wrong" });
  });

///APUNTARSE A EVENTO///
//   router.get("/apuntEvent/:userId"), (req, res, next) =>{
//     const userId = req.params.userId;
   

// }




////EDITAR EVENTO//////

// router.get("/edit/:eventId", (req, res, next) => {
//   const eventId = req.params.eventId;
//   const user = req.user;

//   Event.findById(eventId)
//     .then(MyEvents => res.status(200).json(MyEvents))
//     .catch(e => res.status(500).json(e));
// });

router.put("/edit/:eventId", (req, res, next) => {
  const eventId = req.params.eventId;
  const user = req.user;

  const updateEvent = {
    name: req.body.name,
    date: req.body.time,
    "location.lat": req.body.location1,
    "location.lng": req.body.location2,
    deporte : req.body.deporte,
    description : req.body.description,
    maxPart :req.body.maxPart
  };

  Event.findByIdAndUpdate(eventId, updateEvent, (err, event) => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res.status(200).json({ event });
    }
  });
});

///DELETE EVENTO///
router.get("/delete/:eventId", (req, res, next) => {
    const eventId = req.params.eventId;
    Event.deleteOne({ _id: eventId }, err => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" });
          } else {
            return res.status(200).json({ message: "eliminado correctamente" });
          }
      });


})

      
module.exports = router;

