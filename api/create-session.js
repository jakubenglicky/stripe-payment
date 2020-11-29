const stripe = require('stripe')(process.env.STRIPE_SECRET);

module.exports = (req, res) => {

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: [
			req.body.items,
		],
		mode: 'payment',
		success_url: `${process.env.STRIPE_SUCCESS_URL}`,
		cancel_url: `${process.env.STRIPE_CANCEL_URL}`,
	});

	res.json({ id: session.id });
}
