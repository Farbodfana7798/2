import TeamCard from '../components/TeamCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { agents } from '../data/site'

export default function TeamPreview() {
  return (
    <section className="section" id="team">
      <div className="container">
        <SectionHeading
          eyebrow="Our Team"
          title="The people you will work with"
          text="Four specialists, one point of contact — and a director involved in every negotiation."
          align="center"
        />
        <div className="team-grid">
          {agents.map((agent, index) => (
            <Reveal key={agent.id} delay={index * 80}>
              <TeamCard agent={agent} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
