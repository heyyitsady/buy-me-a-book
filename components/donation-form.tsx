import * as React from "react"
import { useRouter } from "next/navigation"

import { DONATION_IN_CENTS, MAX_DONATION } from "@/config"

import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import * as ToggleGroup from "@radix-ui/react-toggle-group"
import { Icons } from "./icons"
import { useToast } from "./ui/use-toast"

const DonationForm = ({ }) => {
	const [quantity, setQuantity] = React.useState<number>(1)
	const [name, setName] = React.useState<string>("")
	const [message, setMessage] = React.useState<string>("")
	const [isLoading, setIsLoading] = React.useState<boolean>(false)

	const router = useRouter()
	const { toast } = useToast()

	// preset number of books
	const presets = [1, 3, 5]

	async function onSubmit(event: React.SyntheticEvent) {
		event.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
		}, 4000)

		const response = await fetch('/api/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				quantity,
				name,
				message
			}),
		})

		const res = await response.json()
		if (res.url) {
			toast({
				description: "Success! Redirecting to payment page."
			})

			const url = res.url
			router.push(url)
		}

		if (res.error) {
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description: res.error
			})
		}
	}

	return (
		<form
			className="flex flex-col gap-4"
			onSubmit={onSubmit}
		>
			<div className="flex flex-row justify-around items-center gap-1 border border-input p-2">
				<Icons.book />
				<Icons.times className="h-4 w-4" />
				<ToggleGroup.Root
					type="single"
					defaultValue="1"
					aria-label="Number of books"
					className="flex flex-row gap-1"
				>
					{presets.map((preset) => (
						<ToggleGroup.Item
							key={preset}
							value={preset.toString()}
							onClick={() => setQuantity(preset)}
							aria-label={`${preset} books`}
							className={cn(
								"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors data-[state=on]:bg-accent data-[state=on]:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background hover:bg-muted hover:text-muted-foreground",
								"bg-transparent",
								"h-10 w-10 rounded-[50%]"
							)}
						>
							{preset}
						</ToggleGroup.Item>
					))}
				</ToggleGroup.Root>

				<Input
					type="number"
					id="books"
					onChange={(e) => setQuantity(parseFloat(e.target.value))}
					value={quantity}
					min={1}
					max={MAX_DONATION / DONATION_IN_CENTS}
					className="w-14 h-12 hover:bg-accent focus:bg-input"
					disabled={isLoading}
				/>
			</div>

			<Label className="sr-only" htmlFor="name">Name</Label>
			<Input
				type="text"
				id="name"
				onChange={(e) => setName(e.target.value)}
				value={name}
				placeholder="Name or @twitterhandle"
				autoCapitalize="none"
				autoComplete="name"
				autoCorrect="off"
				className="hover:bg-accent focus:bg-input transition duration-200"
				disabled={isLoading}
			/>

			<Label className="sr-only" htmlFor="message">Message</Label>
			<Textarea
				id="message"
				onChange={(e) => setMessage(e.target.value)}
				value={message}
				placeholder="Say something nice...?"
				className="hover:bg-accent focus:bg-input transition duration-200"
				disabled={isLoading}
			/>

			<Button
				variant='default'
				disabled={isLoading}
			>
				{isLoading && (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				)}

				Donate ${quantity * (DONATION_IN_CENTS / 100)}
			</Button>
		</form>
	)
}

export default DonationForm
