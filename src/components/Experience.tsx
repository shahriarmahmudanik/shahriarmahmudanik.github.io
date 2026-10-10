import { profile } from '../data/profile'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section className="section section--alt" id="experience">
      <div className="wrap">
        <SectionHeading label="Experience" title="Where I've worked and studied." />
        <div className="grid-2 grid-2--top">
          <ol className="timeline">
            {profile.experience.map((job, i) => (
              <li className="timeline__item" key={job.role + job.company}>
                <Reveal delay={i * 0.08}>
                  <p className="timeline__dates">{job.dates}</p>
                  <h3 className="timeline__role">{job.role}</h3>
                  <p className="timeline__company">{job.company}</p>
                  <ul className="timeline__points">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="skills">
            <h3 className="subhead">Skills</h3>
            <ul className="chips">
              {profile.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
