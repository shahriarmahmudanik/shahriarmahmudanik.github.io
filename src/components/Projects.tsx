import { projects } from '../data/projects'
import { GitHubRepos } from './GitHubRepos'
import { ProjectGrid } from './ProjectGrid'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="wrap">
        <SectionHeading label="Projects" title="Things I've built." lead="A selection of my work. Click a project for details." />
        <Reveal>
          <ProjectGrid projects={projects} />
        </Reveal>
        <Reveal>
          <GitHubRepos />
        </Reveal>
      </div>
    </section>
  )
}
