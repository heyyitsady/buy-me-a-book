import DonationForm from "./donation-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const DonationCard = () => {
	return (
		<Card className="w-2/5">
			<CardHeader>
				<CardTitle className="text-2xl">Buy <span className="text-muted-foreground">John Doe</span> a book</CardTitle>
			</CardHeader>
			<CardContent>
				<DonationForm />
			</CardContent>
		</Card>
	)
}

export default DonationCard
