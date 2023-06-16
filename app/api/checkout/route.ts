// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DONATION_IN_CENTS, STRIPE_API_KEY } from "@/config";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(STRIPE_API_KEY, {
	apiVersion: "2022-11-15",
})

export async function POST(req: Request, res: Response) {
	const body = await req.json()

	const quantity = body.quantity || 1
	const message = body.message || ''
	const name = body.message || 'Anonymous'

	const headersInstance = headers()

	try {
		const session = await stripe.checkout.sessions.create({
			metadata: {
				name, message
			},
			payment_method_types: ["card"],
			mode: "payment",
			line_items: [
				{
					price_data: {
						currency: "usd",
						product_data: {
							name: "Donation",
						},
						unit_amount: DONATION_IN_CENTS,
					},
					quantity,
				},
			],
			success_url: `${headersInstance.get('origin')}/thank-you`,
			cancel_url: `${headersInstance.get('origin')}/cancel`,
		});

		const url = session.url

		if (url) {
			return NextResponse.json({ url }, { status: 200 })
		}

		return NextResponse.json({ message: "Something went wrong" }, { status: 500 })

	} catch (e) {
		console.error("Error creating session " + e)
		return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
	}
}

