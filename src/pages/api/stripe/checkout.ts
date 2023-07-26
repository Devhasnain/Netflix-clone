// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import configurations from '@/configuration';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe';

const paths = configurations.site;

type Data = {
    name: string
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        if (req.method !== "POST") throw "Method not allowed";
        const { price_id } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: price_id,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: paths.domain + paths.paths.pricing + "success=true", // Redirect URL after successful payment
            cancel_url: paths.domain + paths.paths.pricing + "error=true"   // Redirect URL if the user cancels the payment
        });
        console.log(session.id)
        res.status(200).json({ name: "hasnain" });

    } catch (error) {
        const errorPath = req.url
        console.log(errorPath);
        // res.redirect('/')
        res.status(500).json({ name: "error" })
    }
}
