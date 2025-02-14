"use client"

import { Button } from '@/app/_components/ui/button';
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react';
import { Petshop } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/app/_components/ui/sheet';
import SideMenu from '@/app/_components/side-menu';

interface PetshopInfoProps {
    petshop: Petshop
}

const PetshopInfo = ({ petshop }: PetshopInfoProps) => {
    const router = useRouter();

    const handleBackClick = () => {
        router.replace('/')
    }

    return (
        <div>
            <div className='h-[250px] w-full relative'>
                <Button onClick={handleBackClick} size="icon" variant="outline" className='z-50 absolute top-4 left-4'>
                    <ChevronLeftIcon />
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline" className='z-50 absolute top-4 right-4'>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SideMenu></SideMenu>
                    </SheetContent>
                </Sheet>

                <Image
                    src={petshop.imageUrl}
                    fill
                    alt={petshop.name}
                    style={{
                        objectFit: "cover"
                    }}
                    className='opacity-75'
                />
            </div>

            <div className='px-5 pt-3 pb-6 border-b border-solid border-secondary'>
                <h1 className='text-xl font-bold'>{petshop.name}</h1>
                <div className="flex items-center gap-1 mt-2">
                    <MapPinIcon className='text-primary' size={18} />
                    <p className='text-sm'>{petshop.address}</p>
                </div>

                <div className="flex items-center gap-1 mt-2">
                    <StarIcon className='text-primary' size={18} />
                    <p className='text-sm'>5,0 (899 avaliações)</p>
                </div>
            </div>
        </div>
    )
}

export default PetshopInfo;