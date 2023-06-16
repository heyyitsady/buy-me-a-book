import Image from "next/image"
import Link from "next/link"

import Art from "@/public/weird-rect-thing.gif"

import { AspectRatio } from "./ui/aspect-ratio"
import { Card, CardContent } from "./ui/card"
import { Icons } from "./icons"

const InfoCard = () => {
	return (
		<Card className="w-3/5">
			<CardContent>
				<AspectRatio ratio={16 / 9}>
					<Image src={Art} alt="Generative art thing" fill />
				</AspectRatio>

				<p className="leading-normal text-muted-foreground mt-4 p-4">
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
				</p>

				<div className="flex flex-row gap-4 p-4 pb-0">
					<Link href="https://github.com/SazedWorldbringer" target="_blank">
						<Icons.github className="text-muted-foreground hover:text-foreground hover:scale-105 transition duration-200" />
					</Link>
					<Link href="https://atharvapardeshi.vercel.app" target="_blank">
						<Icons.website className="text-muted-foreground hover:text-foreground hover:scale-105 transition duration-200" />
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}

export default InfoCard
