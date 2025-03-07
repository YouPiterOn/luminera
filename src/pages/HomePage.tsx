import Header from "../blocks/Header"
import ButtonLink from "../components/ButtonLink";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-pearl-bush-100 text-ebony-clay-950">
      <Header />

      <section className="relative px-6 py-12 md:py-20">
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-5xl font-bold text-ebony-clay-950 leading-none">
            Pixel Perfect
            <br />
            [<span className="text-ebony-clay-800">Anytime</span>, <span className="text-ebony-clay-800">Anywhere</span>]
          </h2>
          <p className="text-xl text-ebony-clay-950">
            <span className="text-ebony-clay-800">Luminera</span> brings professional pixel art tools to your browser - fast, smooth, and free.
          </p>
          <div className="flex flex-row gap-4">
            <ButtonLink className="min-w-32 py-1" href="/canvas" highlighted>
              Start Creating
            </ButtonLink>
            <ButtonLink className="min-w-32 py-1">
              Gallery
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage;