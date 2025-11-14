'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({ transactions: 0, businesses: 0, uptime: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepTime = duration / steps

    const targets = { transactions: 10, businesses: 5000, uptime: 99.9 }
    let current = { transactions: 0, businesses: 0, uptime: 0 }

    const timer = setInterval(() => {
      current.transactions = Math.min(current.transactions + targets.transactions / steps, targets.transactions)
      current.businesses = Math.min(current.businesses + targets.businesses / steps, targets.businesses)
      current.uptime = Math.min(current.uptime + targets.uptime / steps, targets.uptime)

      setAnimatedStats({
        transactions: Math.floor(current.transactions),
        businesses: Math.floor(current.businesses),
        uptime: Number(current.uptime.toFixed(1))
      })

      if (current.transactions >= targets.transactions) {
        clearInterval(timer)
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <main className={styles.main}>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            FlowPOS
          </div>
          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
            <button className={styles.ctaButton}>Start Free Trial</button>
          </div>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gridOverlay}></div>
          <div className={styles.gradient1}></div>
          <div className={styles.gradient2}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span className={styles.badgeDot}></span>
            Trusted by 5,000+ businesses
          </div>

          <h1 className={styles.heroTitle}>
            The Future of
            <span className={styles.gradient}> Point of Sale</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Streamline transactions, manage inventory, and grow your business with our intelligent POS system. Built for modern retailers.
          </p>

          <div className={styles.heroCta}>
            <button className={styles.primaryButton}>
              Get Started Free
              <span className={styles.arrow}>→</span>
            </button>
            <button className={styles.secondaryButton}>
              Watch Demo
              <span className={styles.playIcon}>▶</span>
            </button>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{animatedStats.transactions}M+</div>
              <div className={styles.statLabel}>Transactions/day</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{animatedStats.businesses}+</div>
              <div className={styles.statLabel}>Active Businesses</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNumber}>{animatedStats.uptime}%</div>
              <div className={styles.statLabel}>Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Powerful Features</h2>
          <p className={styles.sectionSubtitle}>Everything you need to run your business efficiently</p>
        </div>

        <div className={styles.featureGrid}>
          <div className={`${styles.featureCard} ${activeFeature === 0 ? styles.featureActive : ''}`}
               onMouseEnter={() => setActiveFeature(0)}>
            <div className={styles.featureIcon}>💳</div>
            <h3 className={styles.featureTitle}>Fast Payments</h3>
            <p className={styles.featureDescription}>
              Process transactions in seconds with support for all major payment methods including cards, mobile wallets, and contactless.
            </p>
            <div className={styles.featureMetric}>
              <span className={styles.metricValue}>2.6s</span>
              <span className={styles.metricLabel}>avg. checkout time</span>
            </div>
          </div>

          <div className={`${styles.featureCard} ${activeFeature === 1 ? styles.featureActive : ''}`}
               onMouseEnter={() => setActiveFeature(1)}>
            <div className={styles.featureIcon}>📊</div>
            <h3 className={styles.featureTitle}>Real-time Analytics</h3>
            <p className={styles.featureDescription}>
              Track sales, inventory, and customer insights in real-time. Make data-driven decisions with powerful dashboards.
            </p>
            <div className={styles.featureMetric}>
              <span className={styles.metricValue}>50+</span>
              <span className={styles.metricLabel}>custom reports</span>
            </div>
          </div>

          <div className={`${styles.featureCard} ${activeFeature === 2 ? styles.featureActive : ''}`}
               onMouseEnter={() => setActiveFeature(2)}>
            <div className={styles.featureIcon}>📦</div>
            <h3 className={styles.featureTitle}>Inventory Management</h3>
            <p className={styles.featureDescription}>
              Automate stock tracking, get low-stock alerts, and manage multiple locations from a single dashboard.
            </p>
            <div className={styles.featureMetric}>
              <span className={styles.metricValue}>99.8%</span>
              <span className={styles.metricLabel}>accuracy rate</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.integration}>
        <div className={styles.integrationCard}>
          <div className={styles.integrationContent}>
            <h2 className={styles.integrationTitle}>Seamless Integration</h2>
            <p className={styles.integrationText}>
              Connect with your existing tools and platforms. From accounting software to e-commerce platforms, we've got you covered.
            </p>
            <div className={styles.integrationLogos}>
              <div className={styles.integrationLogo}>Stripe</div>
              <div className={styles.integrationLogo}>Square</div>
              <div className={styles.integrationLogo}>QuickBooks</div>
              <div className={styles.integrationLogo}>Shopify</div>
            </div>
          </div>
          <div className={styles.integrationVisual}>
            <div className={styles.connectionNode}></div>
            <div className={styles.connectionNode}></div>
            <div className={styles.connectionNode}></div>
            <div className={styles.connectionNode}></div>
          </div>
        </div>
      </section>

      <section id="pricing" className={styles.pricing}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Simple, Transparent Pricing</h2>
          <p className={styles.sectionSubtitle}>No hidden fees. Cancel anytime.</p>
        </div>

        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h3 className={styles.pricingPlan}>Starter</h3>
              <div className={styles.pricingPrice}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>49</span>
                <span className={styles.period}>/month</span>
              </div>
            </div>
            <ul className={styles.pricingFeatures}>
              <li>✓ Up to 1,000 transactions/month</li>
              <li>✓ 1 location</li>
              <li>✓ Basic reporting</li>
              <li>✓ Email support</li>
            </ul>
            <button className={styles.pricingButton}>Get Started</button>
          </div>

          <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
            <div className={styles.popularBadge}>Most Popular</div>
            <div className={styles.pricingHeader}>
              <h3 className={styles.pricingPlan}>Professional</h3>
              <div className={styles.pricingPrice}>
                <span className={styles.currency}>$</span>
                <span className={styles.amount}>149</span>
                <span className={styles.period}>/month</span>
              </div>
            </div>
            <ul className={styles.pricingFeatures}>
              <li>✓ Unlimited transactions</li>
              <li>✓ Up to 5 locations</li>
              <li>✓ Advanced analytics</li>
              <li>✓ Priority support</li>
              <li>✓ API access</li>
            </ul>
            <button className={`${styles.pricingButton} ${styles.pricingButtonPrimary}`}>Get Started</button>
          </div>

          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h3 className={styles.pricingPlan}>Enterprise</h3>
              <div className={styles.pricingPrice}>
                <span className={styles.amount}>Custom</span>
              </div>
            </div>
            <ul className={styles.pricingFeatures}>
              <li>✓ Everything in Professional</li>
              <li>✓ Unlimited locations</li>
              <li>✓ Custom integrations</li>
              <li>✓ Dedicated account manager</li>
              <li>✓ SLA guarantee</li>
            </ul>
            <button className={styles.pricingButton}>Contact Sales</button>
          </div>
        </div>
      </section>

      <section id="contact" className={styles.cta}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Ready to transform your business?</h2>
          <p className={styles.ctaText}>Start your 14-day free trial. No credit card required.</p>

          <form className={styles.ctaForm} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.ctaInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.ctaSubmit}>
              {submitted ? '✓ Sent!' : 'Start Free Trial'}
            </button>
          </form>

          <p className={styles.ctaNote}>Join 5,000+ businesses already using FlowPOS</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>⚡</span>
              FlowPOS
            </div>
            <p className={styles.footerTagline}>Modern POS for modern businesses</p>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#integrations">Integrations</a>
            </div>
            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#careers">Careers</a>
              <a href="#contact">Contact</a>
            </div>
            <div className={styles.footerColumn}>
              <h4>Legal</h4>
              <a href="#privacy">Privacy</a>
              <a href="#terms">Terms</a>
              <a href="#security">Security</a>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2024 FlowPOS. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
