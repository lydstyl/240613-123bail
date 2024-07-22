const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const storeItems = new Map([
  [1, { priceInCents: 10000, name: 'Learn React Today' }],
  [2, { priceInCents: 20000, name: 'Learn CSS Today' }]
])

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        // line_items: [
        //   {
        //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        //     // price: '{{PRICE_ID}}',
        //     // price: '1234',
        //     price: 1234,
        //     quantity: 1
        //   }
        // ],
        // mode: 'payment',
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          { id: 1, quantity: 3 },
          { id: 2, quantity: 1 }
        ].map((item) => {
          const storeItem = storeItems.get(item.id)
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: storeItem.name
              },
              unit_amount: storeItem.priceInCents
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`
      })
      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

// https://docs.stripe.com/checkout/quickstart?client=next

// https://www.youtube.com/watch?v=1r-F3FIONl8
