import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale';

import Header from "../_components/header"
import Search from "./_components/search"
import BookingItem from '../_components/booking-item';
import { db } from "../_lib/prisma"
import PetshopItem from './_components/petshop-item';
import { getServerSession } from 'next-auth';
import { authOptions } from '../_lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions)

  const petshops = await db.petshop.findMany({});

  const confirmedBookings = session?.user ? await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      }
    },
    include: {
      service: true,
      petshop: true
    }
  }) : [];

  return (
    <div>
      <Header />
      <div className='px-5 pt-5'>
        <h2 className="text-xl font-bold"> {session?.user ? `Olá ${session?.user?.name?.split(" ")[0]}` : 'Vamos agendar um serviço hoje?'} </h2>
        <p className="capitalize text-sm">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
      </div>
      <div className='px-5 mt-6'>
        <Search />
      </div>

      <div className="mt-6">

        {confirmedBookings.length > 0 && (
          <>
            <h2 className='pl-5 text-xs uppercase text-gray-400 font-bold mb-3'>Agendamentos</h2>

            <div className='px-5 mt-6 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
              {confirmedBookings.map(booking => <BookingItem key={booking.id} booking={booking} />)}
            </div>

          </>
        )}

      </div>
      <div className='mt-6'>
        <h2 className='px-5 text-xs mb-3 uppercase text-gray-400 font-bold'>Recomendados</h2>
        <div className='flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {petshops.map((petshop) => (

            <div key={petshop.id} className='min-w-[167px] max-w-[167px]'>
              <PetshopItem key={petshop.id} petshop={petshop} />
            </div>


          ))}
        </div>
      </div>
      <div className='mt-6 mb-[4.5rem]'>
        <h2 className='px-5 text-xs mb-3 uppercase text-gray-400 font-bold'>Populares</h2>
        <div className='flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden'>
          {petshops.map((petshop) => (
            <div key={petshop.id} className='min-w-[167px] max-w-[167px]'>
              <PetshopItem key={petshop.id} petshop={petshop} />
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}
