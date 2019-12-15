const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket')

router.get('/', async (req, res)=> {
try { const tickets = await Ticket.find()
	res.json(tickets);
}
catch(err) {
res.json({message: err});
}
})

router.post('/', async (req, res) => {
const ticket = new Ticket({
	title: req.body.title,
	description: req.body.description
});
try {
		const savedTicket = ticket.save()
		res.json(ticket)
	} catch(err) {
		res.json({message: err})
	}
});

router.get('/:ticketId', async (req,res) => {
	try { const ticket = await Ticket.findById(req.params.ticketId);
	res.json(ticket);
	}
	catch(err) {
		res.json({message: err});
	}
})

router.delete('/:ticketId', async (req,res) => {
	try {
		const ticketToRemove = await Ticket.remove({_id: req.params.ticketId})
		res.json(Ticket.find());
	}
	catch (err) {
		res.json({message: err})
	}
})

router.patch('/:ticketId', async (req,res) => {
	try {
		const updatedTicket = await Ticket.updateOne({
			id: req.params.ticketId,
			title: req.body.title
		})
		res.json(updatedTicket)
	}
	catch(err) {
		res.json({message:err})
	}
})
module.exports = router;
