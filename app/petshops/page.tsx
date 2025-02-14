import { redirect } from "next/navigation";
import PetshopItem from "../(home)/_components/petshop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import Search from "../(home)/_components/search";

interface PetshopsPageProps {
  searchParams: {
    search?: string;
  };
}


const PetshopsPage = async ({ searchParams }: { searchParams: Promise<PetshopsPageProps['searchParams']> }) => {
  const { search } = await searchParams; // Aguarda a resolução de `params`
  if (!search) {
    return redirect("/");
  }
  const petshops = await db.petshop.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header />

      <div className="px-5 py-6 flex flex-col gap-6">
        <Search
          defaultValues={{
            search: search,
          }}
        />

        <h1 className="text-gray-400 font-bold text-xs uppercase">Resultados para &quot;{search}&quot;</h1>

        <div className="grid grid-cols-2 gap-4">
          {petshops.map((petshop) => (
            <div key={petshop.id} className="w-full">
              <PetshopItem petshop={petshop} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PetshopsPage;
