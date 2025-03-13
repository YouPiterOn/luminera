import Header from "../blocks/Header";
import PaletteCard from "../blocks/PaletteCard";
import { trpc } from "../clients/trpc";

const PalettesPage = () => {
  const { data: palettes = [], error } = trpc.palettes.getPalettes.useQuery();

  return (
    <div className="flex flex-col min-h-screen bg-pearl-bush-100 text-ebony-clay-950">
      <Header />
      <section className="p-6">
        <h2 className="text-2xl font-bold text-ebony-clay-950 mb-4">Palettes</h2>
        {
          error ? <div>error</div> :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {palettes.map((palette, index) => (
                <PaletteCard key={index} palette={palette} />
              ))}
            </div>
        }
      </section>
    </div>
  );
};

export default PalettesPage;
