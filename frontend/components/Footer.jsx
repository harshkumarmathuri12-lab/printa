import Link from 'next/link';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
          d="M7.75 2.5h8.5A5.25 5.25 0 0 1 21.5 7.75v8.5a5.25 5.25 0 0 1-5.25 5.25h-8.5A5.25 5.25 0 0 1 2.5 16.25v-8.5A5.25 5.25 0 0 1 7.75 2.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12 16.25A4.25 4.25 0 1 0 12 7.75a4.25 4.25 0 0 0 0 8.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M17.2 6.9h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://x.com',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
          d="M14.2 10.3 21.5 2.5h-1.8l-6.3 6.8L8.3 2.5H2.5l7.7 10.1-7.7 8.9h1.8l6.7-7.6 5.8 7.6h5.8l-8.4-11.2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (props) => (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
          d="M6.9 7.3a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4.8 20.7h4.2V9H4.8v11.7ZM10.9 9h4v1.6h.1c.6-1.1 2-1.9 3.6-1.9 3.9 0 4.6 2.6 4.6 5.9v6.1H19v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9v5.5h-4.2V9Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

const TRUST_SIGNALS = [
  { title: 'Secure Payments', description: 'Encrypted checkout & trusted gateways.' },
  { title: 'Fast Delivery', description: 'Reliable shipping with live tracking.' },
  { title: 'Quality Guarantee', description: 'Prints you’ll love, every time.' },
];

function FooterLink({ href, children }) {
  const className =
    'inline-flex items-center text-sm text-gray-300 transition hover:-translate-y-0.5 hover:text-white';

  if (href.startsWith('http')) {
    return (
      <a className={className} href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-black tracking-tight text-white">Printa</div>
              <p className="mt-1 text-sm font-semibold text-gray-200">Create. Customize. Print.</p>
            </div>
            <p className="max-w-sm text-sm leading-6 text-gray-300">
              Premium custom printing for businesses and creators—designed fast, produced with care, delivered on time.
            </p>

            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.name}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
                >
                  <item.icon className="h-5 w-5 text-gray-200 transition group-hover:text-white" />
                </a>
              ))}
            </div>

            <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              {TRUST_SIGNALS.map((signal) => (
                <div key={signal.title} className="flex gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-xs text-white">
                    ✓
                  </span>
                  <div>
                    <div className="text-sm font-bold text-white">{signal.title}</div>
                    <div className="text-xs leading-5 text-gray-300">{signal.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-white">Shop</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <FooterLink href="/#products">Business Cards</FooterLink>
              </li>
              <li>
                <FooterLink href="/#products">T-Shirts</FooterLink>
              </li>
              <li>
                <FooterLink href="/#products">Mugs</FooterLink>
              </li>
              <li>
                <FooterLink href="/#products">Posters</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.14em] text-white">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <FooterLink href="#">Help Center</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Track Order</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Returns &amp; Refunds</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Contact Us</FooterLink>
              </li>
            </ul>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-white">Company</h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <FooterLink href="#">About Us</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Careers</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Privacy Policy</FooterLink>
                </li>
                <li>
                  <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-white">Contact</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <a
                      className="inline-flex items-center gap-2 text-gray-300 transition hover:-translate-y-0.5 hover:text-white"
                      href="mailto:support@printa.com"
                    >
                      <span className="text-white/70">Email:</span> support@printa.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Phone</dt>
                  <dd>
                    <a
                      className="inline-flex items-center gap-2 text-gray-300 transition hover:-translate-y-0.5 hover:text-white"
                      href="tel:+919876543210"
                    >
                      <span className="text-white/70">Phone:</span> +91 9876543210
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Printa. All rights reserved.</p>
          <p className="text-gray-500">Built for brands that print with confidence.</p>
        </div>
      </div>
    </footer>
  );
}
