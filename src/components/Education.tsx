import { profile } from '../data/profile'
import { SectionHeading } from './SectionHeading'
import { Timeline } from './Timeline'

export function Education() {
  const entries = profile.education.map((e) => ({ title: e.degree, org: e.school, dates: e.dates, current: e.current, points: e.points }))
  return (
    <section className="section" id="education">
      <div className="wrap">
        <SectionHeading label="Education" title="Where I've studied." />
        <Timeline entries={entries} />
      </div>
    </section>
  )
}
