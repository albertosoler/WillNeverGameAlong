const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const EventUser = require("../models/Event-user");

////OBTENER TODOS LOS EVENTOS///// Funciona

router.get("/event/allshow", (req, res, next) => {
  console.log("entroooo back");
  Event.find({}, function(err, p) {
    User.populate(p, { path: "author" })

      .then(allMyEvents => res.status(200).json(allMyEvents))
      .catch(e => res.status(500).json(err));
  });
});

///OBTENER MIS EVENTOS//////Funciona
router.get("/event/myshow", function(req, res) {
  const UserId = res.locals.user._id;
  console.log("entro en mis back")

  Event.find({ author: UserId })
    .populate({ path: "author", model: 'User' })
    .populate({ path: "participantes", model: 'User' })
    .then(allMyEvents => res.status(200).json(allMyEvents))
      .catch(e => res.status(500).json(err));
     
    });
 

///////UNIRME AL EVENTO /////// Funciona
router.post("/event/join/:EventId", (req, res, next) => {
  UserId = res.locals.user._id;
  EventId = req.params.EventId;

  console.log(UserId);
  console.log(EventId);

  Event.findByIdAndUpdate(
    EventId,
    { $push: { participantes: UserId } },
    { new: true }
  )
    .then(updatedEvent => {
      res.status(200).json(updatedEvent);
      res.status(200).json(participantes);
    })
    .catch(e => res.status(500).json(e));
});

router.get("/event/join/:id", function(req, res, next) {
  const id = req.params.id;


  Event.findById(id, function(err, p) {
    User.populate(p, { path: "author" }),
    User.populate(p, { path: "participantes" })
   
    
    .then(list => res.status(200).json(list))
    .catch(e => res.status(500).json(e));

       

      
    
    

   

    
     
    
      
  });
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
  const time = req.body.time;
  const date = req.body.date;
  const ciudad = req.body.ciudad;
  const calle = req.body.calle;
  const comunidad = req.body.comunidad;
  var numero = 0;
  var img = "";

  if (deporte === "Futbol 11") {
    img =
      "http://imag.futbolia.com/articulos/medidas-oficiales-de-los-campos-de-futbol-segun-fifa.jpg";
  } else if (deporte === "Futbol Sala") {
    img =
      "http://www1.pictures.zimbio.com/gi/Fernandao+Spain+v+Croatia+EoTFC6StXXgl.jpg";
  } else if (deporte === "Baloncesto") {
    img =
      "http://www.oribeltzaportugalete.com/images/contenido/canastabaskettecnificacion18febrero.jpg";
  } else if (deporte === "Tenis") {
    img =
      "http://www.voxstadium.fr/wp-content/uploads/2016/11/tennis-660x400.jpg";
  } else if (deporte === "Padel") {
    img =
      "http://blog.padel.decathlon.es/wp-content/uploads/2017/05/desgaste-padel.jpg";
  } else if (deporte === "Futbol 7") {
    img =
      "https://entrenadorfutbol.es/wp-content/uploads/2016/02/P1090924-1280x640.jpg";
  }

  const newEvent = new Event({
    author,
    description,
    date,
    time,
    deporte,
    img,
    "location.lat": lat,
    "location.lng": lng,
    ciudad,
    calle,
    comunidad,
    maxPart,
    numero
    
    // "direccion.ciudad": "" + ciudad
  });

  newEvent.save().then(evento => {
    console.log("Plan creado en la base de datos");
    const newEventUser = new EventUser({
      eventId: evento._id,
      userId: author
    });
    newEventUser
      .save()
      .then(evento => {
        console.log("EventUser creado");
      })
      .then(e => {
        console.log("Evento asociado a usuario");
        return res
          .status(200)
          .json({ message: "Evento asociado a usuario y creado" });
      })
      .catch(e => {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
      });
  });
});

router.put("/event/edit/:eventId", (req, res, next) => {
  const eventId = req.params.eventId;
  const user = req.user;

  const updateEvent = {
    name: req.body.name,
    date: req.body.time,
    "location.lat": req.body.location1,
    "location.lng": req.body.location2,
    deporte: req.body.deporte,
    description: req.body.description,
    maxPart: req.body.maxPart
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
router.post("/event/delete/:eventId", (req, res, next) => {
  console.log("entrooooo al back borrado");
  const eventId = req.params.eventId;
  Event.deleteOne({ _id: eventId }, err => {
    if (err) {
      return res.status(500).json({ message: "Something went wrong" });
    } else {
      return res.status(200).json({ message: "eliminado correctamente" });
    }
  });
});
router.put("/event/deletepart/:eventId", (req, res, next) => {
  console.log("entro al backkkkkkend");
  const eventId = req.params.eventId;
  var userId = req.user._id;

  Event.findById(eventId, function(err, evento) {

    
    evento.participantes.forEach((x, i) => {
      if (x + "" === userId + "") {
        console.log(x)
        
       
        if(evento.participantes.length == 1){
          console.log("es igual a 1 parti")
          var arr = evento.participantes.splice(i + 1,1);
          console.log(arr)
      
        }else if (evento.participantes.length >1){
          var arr = evento.participantes.splice(i,1);
          console.log("es igual a +1 parti")
          console.log(arr)

        }
        Event.findByIdAndUpdate(
          eventId,
          { $set: { 'participantes' : evento.participantes } },
          { new: true },
          function(err, tank) {
            if (err) {
              return res.status(500).json({ message: "Something went wrong" });
            } else {
              return res.status(200).json({tank});
            }
          }
        );
      }
    });
  });

  // .then(e => {
  //   console.log("Evento asociado a usuario");
  //   return res.status(200).json({ message: "Evento asociado a usuario y creado" });
  // })
  // .catch(e => {
  //   console.log(e);
  //   return res.status(500).json({ message: "Something went wrong" });
  // });
});

module.exports = router;
