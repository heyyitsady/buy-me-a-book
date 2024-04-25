import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Profile = () => {
	return (
		<div className="flex flex-col justify-center items-center my-6">
			<Avatar className="h-28 w-28 md:h-36 md:w-36" >
				<AvatarImage src="/john-doe.jpg" className="object-cover" />
				<AvatarFallback>John Doe</AvatarFallback>
			</Avatar>
			<h1 className="text-3xl font-bold">John Doe</h1>
			<p className="text-xl">is a self-taught software developer</p>
		</div>
	)
}

export default Profile
