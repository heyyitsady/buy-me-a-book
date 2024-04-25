import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Thank you',
  description: 'Thank you for buying books for me :) | Atharva Pardeshi (SazedWorldbringer)'

}

export default function page() {
  return (
    <div>
      <main className='container max-w-6xl h-screen flex flex-col justify-center items-center m-auto'>
        <div className='flex flex-col justify-center items-center my-6'>
          <Avatar className="h-28 w-28 md:h-36 md:w-36 mb-4" >
            <AvatarImage src="https://avatars.githubusercontent.com/u/66564964?v=4" />
            <AvatarFallback>John Doe</AvatarFallback>
          </Avatar>
          <h1 className='text-4xl font-semibold tracking-tight leading-none'>Thank you!</h1>
          <p className='text-xl leading-normal text-muted-foreground'>Your donation has been received.</p>
        </div>
        <Link className={cn(buttonVariants({ variant: 'default' }))} href='/'>Home</Link>
      </main>
    </div>
  );
}
