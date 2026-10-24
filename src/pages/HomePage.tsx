import { ArrowDown, ArrowUpRight, Check, Instagram, Phone, UtensilsCrossed } from 'lucide-react'
import type { BusinessSettings } from '../types'

type Props = { settings: BusinessSettings; onAdmin: () => void }

const services = [
  { number: '01', title: 'Wedding catering', detail: 'A table worth gathering around, from the first welcome to the final course.' },
  { number: '02', title: 'Party catering', detail: 'Birthdays, anniversaries and all the occasions in between.' },
  { number: '03', title: 'Function catering', detail: 'Thoughtful food and warm service for the moments that bring everyone home.' },
]

export default function HomePage({ settings, onAdmin }: Props) {
  const phoneHref = `tel:${settings.phone.replace(/\D/g, '')}`
  const instagramHref = `https://instagram.com/${settings.instagram.replace(/^@/, '')}`
  return (
    <div className="public-site">
      <header className="public-header">
        <a className="public-brand" href="#home" aria-label="Gokul Jadhav Catering home"><img className="brand-logo" src="/gokul-jadhav-logo.svg" alt="Gokul Jadhav Catering" /></a>
        <nav className="public-nav" aria-label="Main navigation"><a href="#services">Our services</a><a href="#approach">Our approach</a><a href="#contact">Get in touch</a></nav>
        <a className="header-call" href={phoneHref}><Phone size={15} /> <span>Call to enquire</span></a>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> GOOD FOOD, GATHERED WELL</div>
            <h1>Make room<br />for <em>one more.</em></h1>
            <p>Food made with care. Hospitality that feels like home. Thoughtful catering for the days you will remember.</p>
            <div className="hero-actions"><a className="button-primary" href={phoneHref}><Phone size={17} /> Call {settings.phone}</a><a className="button-text" href="#services">Explore our catering <ArrowDown size={16} /></a></div>
            <div className="hero-note"><span className="note-rule" /><span>WEDDINGS · CELEBRATIONS · FAMILY GATHERINGS</span></div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=85" alt="A colourful, freshly prepared Indian meal set out for sharing" />
            <div className="image-index"><span>01</span><span className="index-rule" /><span>MADE TO GATHER</span></div>
            <div className="hero-stamp"><UtensilsCrossed size={22} strokeWidth={1.5} /><span>MADE<br />WITH CARE</span></div>
          </div>
          <a className="scroll-cue" href="#services"><span>SCROLL TO DISCOVER</span><ArrowDown size={14} /></a>
        </section>

        <section id="services" className="services-section">
          <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> WHAT WE DO</div><h2>Every gathering<br /><em>deserves a feast.</em></h2></div><p>Menus shaped around your people, your occasion and the way you want the day to feel.</p></div>
          <div className="service-list">{services.map((service) => <article className="service-row" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.detail}</p><ArrowUpRight size={20} /></article>)}</div>
        </section>

        <section id="approach" className="approach-section">
          <div className="approach-photo"><img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&crop=center&w=1100&h=900&q=85" alt="Freshly prepared biryani served with mint and cucumber" /><span className="photo-caption">A LITTLE OF EVERYTHING, MADE YOURS</span></div>
          <div className="approach-copy"><div className="eyebrow"><span className="eyebrow-line" /> OUR APPROACH</div><h2>Your menu.<br /><em>Your kind of gathering.</em></h2><p>Vegetarian or non-vegetarian. A familiar favourite or something made just for you. We work with you to shape a menu that brings everyone to the table.</p><ul className="approach-points"><li><Check size={16} /> Custom menus for every occasion</li><li><Check size={16} /> On-site cooking available</li><li><Check size={16} /> Vegetarian and non-vegetarian options</li></ul><a className="button-text dark" href={phoneHref}>Let's plan your menu <ArrowUpRight size={17} /></a></div>
        </section>

        <section className="menu-band"><div className="menu-band-inner"><div className="eyebrow light"><span className="eyebrow-line" /> GOOD FOOD, YOUR WAY</div><h2>Made for your people.<br /><em>Remembered for the food.</em></h2><a className="button-light" href={phoneHref}>Tell us what you're celebrating <ArrowUpRight size={16} /></a></div><span className="band-decoration">GJ</span></section>

        <section id="contact" className="contact-section"><div><div className="eyebrow"><span className="eyebrow-line" /> LET'S MAKE A DAY OF IT</div><h2>Have a date<br />in mind?</h2><p>Tell us about your gathering and we'll start with the menu.</p></div><div className="contact-actions"><a className="contact-link" href={phoneHref}><span><small>CALL US</small><b>{settings.phone}</b></span><ArrowUpRight size={19} /></a><a className="contact-link" href={instagramHref} target="_blank" rel="noreferrer"><span><small>FOLLOW ALONG</small><b>@{settings.instagram.replace(/^@/, '')}</b></span><Instagram size={19} /></a>{settings.location && <p className="location-note">{settings.location}</p>}</div></section>
      </main>

      <footer className="public-footer"><a className="public-brand" href="#home" aria-label={`${settings.businessName} home`}><img className="brand-logo" src="/gokul-jadhav-logo.svg" alt={settings.businessName} /></a><span>GOOD FOOD. GOOD COMPANY.</span><button className="admin-entry" onClick={onAdmin}>Admin access</button><span>© {new Date().getFullYear()}</span></footer>
    </div>
  )
}