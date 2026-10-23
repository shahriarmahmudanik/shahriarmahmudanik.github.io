import { coffeeUrl } from '../data/profile'

export function CoffeeButton() {
  return (
    <a className="btn coffee-btn" href={coffeeUrl} target="_blank" rel="noopener noreferrer">
      <svg className="coffee-btn__cup" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path className="coffee-btn__steam" d="M8 2c-1 1.2 1 2 0 3.5M12 2c-1 1.2 1 2 0 3.5M16 2c-1 1.2 1 2 0 3.5" />
        <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9ZM17 10h1.5a2.5 2.5 0 0 1 0 5H17" />
      </svg>
      Buy me a coffee
    </a>
  )
}
