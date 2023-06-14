import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Profile = () => {
	return (
		<div className="flex flex-col justify-center items-center my-6">
			<Avatar className="h-28 w-28 md:h-36 md:w-36" >
				<AvatarImage src="https://avatars.githubusercontent.com/u/66564964?v=4" />
				<AvatarFallback>Sazed</AvatarFallback>
			</Avatar>
			<h1 className="text-3xl font-bold">Atharva Pardeshi (Sazed)</h1>
			<p className="text-xl">is a self-taught software developer</p>
		</div>
	)
}

export default Profile
