
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.post('/create-session', async (req, res) => {

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
});
app.listen(4242, () => console.log('Running on port 4242'));
