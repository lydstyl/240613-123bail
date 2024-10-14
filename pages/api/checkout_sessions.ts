const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const storeItems = new Map([
  [1, { priceInCents: 1990, name: 'Votre bail' }]
  //   [2, { priceInCents: 20000, name: 'Learn CSS Today' }]
])

export default async function handler(
  req: { method: string; query: { leaseUrl: any }; headers: { origin: any } },
  res: {
    redirect: (arg0: number, arg1: any) => void
    status: (arg0: number) => {
      (): any
      new (): any
      json: { (arg0: any): void; new (): any }
      end: { (arg0: string): void; new (): any }
    }
    setHeader: (arg0: string, arg1: string) => void
  }
) {
  if (req.method === 'POST') {
    try {
      const { leaseUrl } = req.query
      console.log('🚀 ~ handler ~ leaseUrl:', leaseUrl)
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [{ id: 1, quantity: 1 }].map((item) => {
          const storeItem:
            | {
                priceInCents: number
                name: string
              }
            | undefined = storeItems.get(item.id)
          return {
            price_data: {
              currency: 'eur',
              product_data: {
                name: storeItem?.name
              },
              unit_amount: storeItem?.priceInCents
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/?success=true&leaseUrl2=${leaseUrl}`,
        cancel_url: `${req.headers.origin}/?canceled=true`
      })
      res.redirect(303, session.url)
    } catch (err) {
      res.status((err as any).statusCode || 500).json((err as any).message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

// https://docs.stripe.com/checkout/quickstart?client=next

// https://www.youtube.com/watch?v=1r-F3FIONl8
