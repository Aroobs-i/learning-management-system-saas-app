import ComapnionLists from "@/components/ComapnionLists"
import CompanionCard from "@/components/CompanionCard"
import CTA from "@/components/CTA"
import { recentSessions } from "@/constants"

const Page = () => {
  return (
    <main>
      <h1>Popular Comapnions</h1>
      
      <section className="home-section">
        <CompanionCard
           id="123"
           name="Neura the Brainy Explorer"
           topic="Neural Network of the Brain"
           subject="science"
           duration={45}
           color="#ffda6e" 
        />
        <CompanionCard
           id="456"
           name="Countsy the Number Wizard"
           topic="Derivatives & Integrals"
           subject="Maths"
           duration={30}
           color="#e5d0ff" 
        />
        <CompanionCard
           id="789"
           name="Verba the Vocabulary Builder"
           topic="English Literature"
           subject="English"
           duration={30}
           color="#bde7ff" 
        />
        
      </section>

      <section className="home-section">
        <ComapnionLists
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full" 
        />
        <CTA />
      </section>
    </main>
  )
}

export default Page