import { profile } from '../data/profile'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { Timeline } from './Timeline'

export function Experience() {
  const entries = profile.experience.map((j) => ({ title: j.role, org: j.company, location: j.location, dates: j.dates, current: j.current, points: j.points }))
  return (
    <section className="section section--alt" id="experience">
      <div className="wrap">
        <SectionHeading label="Experience" title="Where I've worked." />
        <Timeline entries={entries} />
        <Reveal className="skills-row">
          <h3 className="subhead">Skills</h3>
          <ul className="chips">
            {profile.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
