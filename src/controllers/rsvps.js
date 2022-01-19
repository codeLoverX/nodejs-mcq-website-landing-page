
module.exports = (app, models) => {

    // NEW
    app.get('/events/:eventId/rsvps/new', (req, res) => {
        models.Event.findByPk(req.params.eventId, { raw: true }).then(event => {
            res.render('rsvps-new', { event: event });
        });
    });

    // CREATE
    app.post('/events/:eventId/rsvps', (req, res) => {
        models.Rsvp.create({
            EventId: parseInt(req.params.eventId),
            name: req.body.name, 
            email: req.body.email
        }).then(rsvp => {
            console.log("hi\nn\n")
            console.log(rsvp)
            console.log("hi\nn\n")
            res.redirect(`/events/${req.params.eventId}`);
        }).catch((err) => {
            console.log(err)
        });
    });

    
    // DELETE
    app.delete('/events/:eventId/rsvps/:id', (req, res) => {
        models.Rsvp.findByPk(req.params.id).then(rsvp => {
            rsvp.destroy();
            res.redirect(`/events/${req.params.eventId}`);
        }).catch((err) => {
            console.log(err);
        });
    });
}
