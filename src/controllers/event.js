
module.exports = function (app, models) {


  var eventsTemplates = [
    { title: "I am your first event", desc: "First event", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
    { title: "I am your second event", desc: "Second event", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
    { title: "I am your third event", desc: "Third event", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
  ]


  // INDEX
  app.get('/', (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']], raw: true }).then(events => {
      res.render('events-index', { events: events });
    })
  })
  // ResetData
  app.get('/resetData', (req, res) => {
    models.Event.destroy({ where: {} }).then(function () {
      models.Event.bulkCreate(eventsTemplates).then(events => {
        res.redirect(`/`);
      })
    });


  })
  // CREATE
  app.post('/events', (req, res) => {
    models.Event.create(req.body).then(event => {
      res.redirect(`/events/${event.id}`)

    }).catch((err) => {
      console.log(err)
    });
  })
  // NEW
  app.get('/events/new', (req, res) => {
    res.render('events-new', {});
  })
  // SHOW
  // SHOW
  app.get('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id, { raw: true }).then(event => {
      models.Rsvp.findAll({
        where: {
          EventId: req.params.id
        },
       raw: true }).then(rsvps => {
        console.log({ rsvps })
        res.render('events-show', { event, rsvps })
      })
    }).catch((err) => {
      console.log(err.message);
    })
  });

  // EDIT
  app.get('/events/:id/edit', (req, res) => {
    models.Event.findByPk(req.params.id, { raw: true }).then((event) => {
      res.render('events-edit', { event: event });
    }).catch((err) => {
      console.log(err.message);
    })
  });

  // UPDATE
  app.put('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id).then(event => {
      event.update(req.body).then(event => {
        res.redirect(`/events/${req.params.id}`);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });

  // DELETE
  app.delete('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id).then(event => {
      event.destroy();
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err);
    });
  })

}
