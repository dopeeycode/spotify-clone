import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";
import AddSongMobile from "@/components/AddSongMobile";
import { useUser } from "@/hooks/useUser";


export const revalidate = 0

export default async function Page() {
  const songs = await getSongs()

  return (
    <div className="bg-neutral-950 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
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
      <AddSongMobile />
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Ultimos Lançamentos</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  )
}
