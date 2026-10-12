import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import TeamCard from '../components/TeamCard'
import CTASection from '../components/CTASection'
import { agents } from '../data/site'

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="Four specialists, one point of contact"
        text="Small by design. You work with the people who know the market and the residence — not a call centre."
        image="1600047509358-9dc75507daeb"
      />

      <section className="section">
        <div className="container">
          <div className="team-grid">
            {agents.map((agent, index) => (
              <Reveal key={agent.id} delay={index * 80}>
                <TeamCard agent={agent} showBio />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Work with Horizon Properties"
        text="Whether you are buying, selling or investing, a director will take your call personally."
        label="Get in touch"
      />
    </>
  )
}
