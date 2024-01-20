// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MERCHANT_ID, SALT_INDEX, SALT_KEY } from "@/config";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid'
import crypto from 'crypto'
import axios from 'axios'

export async function POST(req: Request) {
	const body = await req.json()

	const quantity: number = body.quantity || 1
	const message: string = body.message || ''
	const name: string = body.name || 'Anonymous'

	const transactionId: string = `MT${uuidv4().toString().slice(-6)}`
	const userId: string = `MT${uuidv4().toString().slice(-6)}`

	try {
		const data = {
			merchantId: MERCHANT_ID,
			merchantTransactionId: transactionId,
			merchantUserId: userId,
			amount: quantity * 10000,
			redirectUrl: "http://localhost:3000/thank-you",
			redirectMode: "REDIRECT",
			callbackUrl: "http://localhost:3000",
			mobileNumber: "9999999999",
			paymentInstrument: {
				type: "PAY_PAGE"
			}
		}

		const payload = JSON.stringify(data)
		const payloadMain = Buffer.from(payload).toString('base64')
		console.log(`payload: ${payloadMain}`)

		const toEncode = payloadMain + '/pg/v1/pay' + SALT_KEY
		const sha256 = crypto.createHash('sha256').update(toEncode).digest('hex')
		const checksum = sha256 + '###' + SALT_INDEX
		console.log(`checksum = ${checksum}`)

		const url = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay'
		/* const options = {
			method: 'POST',
			url: url,
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				'X-VERIFY': checksum,
				'X-MERCHANT-ID': MERCHANT_ID,
			},
			data: {
				request: payloadMain
			},
		} */

		axios
			.post(
				url,
				{ request: payloadMain },
				{
					headers: {
						'Content-Type': 'application/json',
						'X-VERIFY': checksum
					}
				},
			)
			.then(response => {
				return NextResponse.json({ url: response.data.data.instrumentResponse.redirectInfo.url }, { status: response.status })
			})
			.catch((e) => {
				console.log(e)
			})
	} catch (e) {
		console.error("Error creating session " + e)
		return NextResponse.json({ message: "Something went wrong" }, { status: 500 })
	}
}
