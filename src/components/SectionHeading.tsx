import { Reveal } from './Reveal'

interface Props {
  label: string
  title: string
  lead?: string
}

export function SectionHeading({ label, title, lead }: Props) {
  return (
    <Reveal>
      <p className="label">{label}</p>
      <h2>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  )
}
