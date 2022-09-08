import type { NextPage } from "next"
import styles from "styles/Home.module.css"
import Hero from "components/pages/Home/Hero/Hero"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main>
        <Hero
          bgURL="/hero.webp"
          title="iso201"
          heading="Content for Creators"
          description="4K and HD videos for your YouTube channel, social media and more..."
        />
      </main>
    </div>
  )
}

export default Home
