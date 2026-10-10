import { profile } from '../data/profile'
import { useSpotlight } from '../hooks/useSpotlight'
import { useTyping } from '../hooks/useTyping'
import heroWebp from '../assets/anik-hero.webp'
import heroJpg from '../assets/anik-hero.jpg'
import heroMobileWebp from '../assets/anik-hero-mobile.webp'
import heroMobileJpg from '../assets/anik-hero-mobile.jpg'

// The same photo is drawn twice: a dark copy underneath and a bright copy on top that is
// revealed only inside the moving circle (the "spotlight").
function Photo({ alt, lit }: { alt: string; lit?: boolean }) {
  return (
    <picture className={`hero__layer ${lit ? 'hero__layer--lit' : 'hero__layer--dim'}`} aria-hidden={lit || undefined}>
      <source media="(max-width: 899px)" type="image/webp" srcSet={heroMobileWebp} />
      <source media="(max-width: 899px)" type="image/jpeg" srcSet={heroMobileJpg} />
      <source type="image/webp" srcSet={heroWebp} />
      <img src={heroJpg} width={1672} height={941} alt={alt} decoding="async" {...(lit ? {} : { fetchPriority: 'high' as const })} />
    </picture>
  )
}

export function Hero() {
  const { heroRef, stageRef, dotRef } = useSpotlight()
  const role = useTyping(profile.roles)

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__stage" ref={stageRef}>
        <Photo alt={`Portrait of ${profile.name}`} />
        <Photo alt="" lit />
        <div className="hero__halo" aria-hidden="true" />
      </div>

      <div className="hero__content wrap">
        <p className="hero__eyebrow">
          {profile.jobTitle} · {profile.location}
        </p>
        <h1 className="hero__title">
          <span className="script" aria-hidden="true">Hello there!</span>
          <span className="sr-only">
            Hello there! I'm {profile.name}, a {profile.jobTitle.toLowerCase()}.
          </span>
        </h1>
        <p className="hero__role" aria-hidden="true">
          <span>{role}</span>
          <span className="caret" />
        </p>
        <p className="hero__intro">{profile.intro}</p>
        <p className="hero__cta">
          <a className="btn btn--primary" href="#projects">View my work</a>
          <a className="btn" href="#contact">Hire me</a>
        </p>
      </div>

      <div className="hero__cursor" ref={dotRef} aria-hidden="true" />
      <a className="scroll-hint" href="#about" aria-label="Scroll to About"><span /></a>
    </section>
  )
}
