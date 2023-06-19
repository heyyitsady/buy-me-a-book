// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { STRIPE_API_KEY, STRIPE_WEBHOOK_SECRET } from "@/config";

import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

import { IncomingMessage } from "http";

import Stripe from "stripe";
import { buffer } from "micro";


const stripe = new Stripe(STRIPE_API_KEY, {
	apiVersion: "2022-11-15",
})

export const config = {
	api: {
		bodyParser: false,
	},
}

export async function POST(req: Request) {
	const body = await req.json()

	const quantity = body.quantity || 1
	const message = body.message || ''
	const name = body.message || 'Anonymous'

	const headersInstance = headers()

	const signature = headersInstance.get('stripe-signature') as string

	if (!signature) {
		return NextResponse.json({ message: "Missing signature" }, { status: 400 })
	}

	const incomingMessage: IncomingMessage = req as unknown as IncomingMessage

	let event: Stripe.Event;
	const buf = await buffer(incomingMessage)

	try {
		event = stripe.webhooks.constructEvent(buf, signature, STRIPE_WEBHOOK_SECRET)
	} catch (e) {
		console.log("Invalid signature " + e)
		return NextResponse.json({ message: "Invalid signature" }, { status: 400 })
	}

	if (event.type !== "checkout.session.completed") {
		return NextResponse.json({ message: "Invalid event type" }, { status: 400 })
	}

	const metadata = (event.data.object as {
		metadata: { name: string, message: string }
	}).metadata

	console.log({ metadata })

	return NextResponse.json({ message: "Success" }, { status: 200 })
}

