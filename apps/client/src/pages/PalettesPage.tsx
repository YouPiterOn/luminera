import Header from "../blocks/Header";
import PaletteCard from "../blocks/PaletteCard";

const palettes = [
  {
    name: "Sunset Bliss",
    author: "PixelMaster",
    colors: ["#FF5733", "#FF8D1A", "#FFC300", "#DAF7A6", "#C70039"],
  },
  {
    name: "Ocean Wave",
    author: "Artisan",
    colors: ["#1B4F72", "#2874A6", "#3498DB", "#85C1E9", "#D6EAF8"],
  },
  {
    name: "Forest Whisper",
    author: "GreenThumb",
    colors: ["#2E8B57", "#3CB371", "#66CDAA", "#98FB98", "#C5E1A5"],
  },
  {
    name: "Neon Cyber",
    author: "TechnoMage",
    colors: ["#0F0F0F", "#8D00FF", "#FF00FF", "#00FFFF", "#FFD700"],
  },
  {
    name: "Desert Dusk",
    author: "SandWanderer",
    colors: ["#C19A6B", "#D2B48C", "#E6BE8A", "#F4A460", "#8B4513"],
  },
  {
    name: "Candy Pop",
    author: "SweetTooth",
    colors: ["#FF69B4", "#FFD700", "#ADFF2F", "#FF4500", "#00CED1"],
  },
];

const PalettesPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-pearl-bush-100 text-ebony-clay-950">
      <Header />
      <section className="p-6">
        <h2 className="text-2xl font-bold text-ebony-clay-950 mb-4">Palettes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {palettes.map((palette, index) => (
            <PaletteCard key={index} palette={palette} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PalettesPage;
