import { profile } from '../data/profile'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Services() {
  return (
    <section className="section section--alt" id="services">
      <div className="wrap">
        <SectionHeading label="Services" title="How I can help." />
        <div className="grid-3">
          {profile.services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <article className="service">
                <span className="service__num" aria-hidden="true">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
