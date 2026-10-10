import { profile } from '../data/profile'
import { helloSignature } from '../data/signature'
import { Link } from 'react-router-dom'
import { Signature } from './Signature'
import { useSpotlight } from '../hooks/useSpotlight'
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

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__stage" ref={stageRef}>
        <Photo alt={`Portrait of ${profile.name}`} />
        <Photo alt="" lit />
        <div className="hero__halo" aria-hidden="true" />
      </div>

      <div className="hero__content wrap">
        <h1 className="hero__title">
          <span className="hero__sig" aria-hidden="true">
            <Signature data={helloSignature} stroke={1.6} duration={2.6} delay={0.3} />
          </span>
          <span className="sr-only">Hello there! I'm {profile.name}, a {profile.jobTitle.toLowerCase()}.</span>
        </h1>
        <p className="hero__intro">
          I'm {profile.name}, a web developer based in Cardiff. I build fast, custom-coded websites, and my code is where
          creativity meets precision. Explore my <Link to="/skills">skills</Link>, <Link to="/projects">projects</Link> and
          journey in <Link to="/about">About</Link>. If we align, let's craft something great together at{' '}
          <Link to="/hire-me">Hire me</Link>.
        </p>
      </div>

      <div className="hero__cursor" ref={dotRef} aria-hidden="true" />
    </section>
  )
}
