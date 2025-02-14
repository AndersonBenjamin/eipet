import { db } from '@/app/_lib/prisma'
import PetshopInfo from './_components/petshop-info';
import ServiceItem from './_components/service-item';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/_lib/auth';
interface PetshopDetailsPageProps {
    params: {
        id?: string;
    }
}

const PetShopDetailsPage = async ({ params }: { params: Promise<PetshopDetailsPageProps['params']> }) => {
    const { id } = await params; // Aguarda a resolução de `params`

    const session = await getServerSession(authOptions);

    if (!id) {
        // TODO redirecionar para a home page
        return null;
    }

    const petshop = await db.petshop.findUnique({
        where: { id },
        include: { services: true },
    });

    if (!petshop) {
        // TODO redirecionar para a home page
        return null;
    }

    return (
        <div>
            <PetshopInfo petshop={petshop} />

            <div className='px-5 flex flex-col gap-4 py-6'>
                {petshop.services.map((service) => (
                    <ServiceItem key={service.id} petShop={petshop} service={service} isAuthenticated={!!session?.user} />
                ))}
            </div>


        </div>
    );
};

export default PetShopDetailsPage;