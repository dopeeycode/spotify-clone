import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export default function Page() {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <section className="mb-2">
          <h1
            className="text-white text-3xl mt-2 font-semibold"
          >
            Bem-vindo de volta !
          </h1>
          <main
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-4"
          >
            <ListItem
              href="liked"
              name="Músicas curtidas"
              image="/images/liked.png"
            />
          </main>
        </section>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Ultimos Lançamentos</h1>
        </div>
        <div>
          Lista de Músicas
        </div>
      </div>
    </div>
  )
}
