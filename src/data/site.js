/**
 * Site-wide content: brand, navigation, contact details, team, services and
 * homepage editorial copy. Kept in one place so content edits never touch
 * component code.
 */

export const brand = {
  name: 'Horizon Properties',
  wordmark: 'Horizon Properties',
  tagline: 'Exceptional homes & investments',
}

export const contact = {
  phone: '(555) 246-7890',
  phoneHref: 'tel:+15552467890',
  email: 'hello@horizonproperties.com',
  emailHref: 'mailto:hello@horizonproperties.com',
  address: '1200 Lakeshore Boulevard, Suite 400',
  city: 'Austin, TX 78701',
  hours: 'Monday – Saturday · 9:00am – 7:00pm',
}

export const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

export const socials = [
  { label: 'Instagram', icon: 'instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', icon: 'linkedin', href: 'https://linkedin.com' },
  { label: 'Facebook', icon: 'facebook', href: 'https://facebook.com' },
  { label: 'X', icon: 'x', href: 'https://x.com' },
]

export const stats = [
  { value: '$2.4B', label: 'Property sold' },
  { value: '1,240', label: 'Homes placed' },
  { value: '18 yrs', label: 'In the market' },
  { value: '96%', label: 'Client referrals' },
]

export const agents = [
  {
    id: 'daniel-morgan',
    name: 'Daniel Morgan',
    role: 'Managing Director',
    photo: '1472099645785-5658abf4ff4e',
    phone: '(555) 246-7890',
    email: 'daniel.morgan@horizonproperties.com',
    bio: 'Founded Horizon Properties after 15 years advising private clients on architectural trophy assets across Texas and the West Coast.',
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    photo: '1573496359142-b8d87734a5a2',
    email: 'olivia.carter@horizonproperties.com',
    phone: '(555) 246-7892',
    bio: 'Specialises in coastal and hillside residences, pairing buyers with architects and designers before the first viewing.',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Investment Consultant',
    photo: '1560250097-0b93528c311a',
    email: 'james.wilson@horizonproperties.com',
    phone: '(555) 246-7894',
    bio: 'Advises family offices and private investors on yield, structuring and long-hold residential portfolios.',
  },
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    photo: '1580489944761-15a19d654956',
    email: 'sophia.bennett@horizonproperties.com',
    phone: '(555) 246-7896',
    bio: 'Leads our relocation practice, guiding international clients through every step of buying in the United States.',
  },
]

export function getAgentById(id) {
  return agents.find((agent) => agent.id === id) ?? agents[0]
}

export const services = [
  {
    id: 'luxury-home-sales',
    title: 'Luxury Home Sales',
    summary:
      'Discreet representation for architectural residences, from private previews to closing.',
    body: 'We present your home to a curated audience of qualified buyers, with art-directed photography, editorial copy and private viewings arranged around your schedule.',
    points: ['Private and off-market sales', 'Art-directed property photography', 'Negotiation led by a director'],
    image: '1592595896551-12b371d546d5',
  },
  {
    id: 'property-investment',
    title: 'Property Investment',
    summary: 'Data-led acquisition strategy for private investors and family offices.',
    body: 'We model yield, holding costs and exit scenarios before you commit, then source properties that match your mandate — including assets that never reach the open market.',
    points: ['Yield and exit modelling', 'Off-market sourcing', 'Portfolio reviews each quarter'],
    image: '1560448204-e02f11c3d0e2',
  },
  {
    id: 'property-marketing',
    title: 'Property Marketing',
    summary: 'Editorial campaigns that position a residence as a piece of architecture.',
    body: 'Cinematic stills, twilight photography, film and print placement combine into a launch that reaches collectors, not just buyers.',
    points: ['Cinematic photography and film', 'Print and digital placement', 'International buyer reach'],
    image: '1600585154340-be6161a56a0c',
  },
  {
    id: 'real-estate-advisory',
    title: 'Real Estate Advisory',
    summary: 'Independent advice on purchase, timing, structure and negotiation.',
    body: 'Whether it is a first acquisition or a generational asset, we act as your advisor rather than a seller — with a written recommendation behind every decision.',
    points: ['Independent, fee-based advice', 'Due diligence coordination', 'Structuring with your counsel'],
    image: '1600607687939-ce8a6c25118c',
  },
  {
    id: 'property-valuation',
    title: 'Property Valuation',
    summary: 'Confident valuations grounded in comparable sales and market evidence.',
    body: 'A written valuation with the comparables behind it, prepared within five working days and suitable for lending, estate planning or negotiation.',
    points: ['Comparable sales analysis', 'Written report in five days', 'Lender-ready documentation'],
    image: '1568605114967-8130f3a36994',
  },
  {
    id: 'relocation-services',
    title: 'Relocation Services',
    summary: 'A single point of contact for moving to a new city — or a new country.',
    body: 'Neighbourhood shortlists, school introductions, immigration coordination and interiors: we handle the detail so you arrive to a home, not a list of tasks.',
    points: ['Neighbourhood shortlists', 'School and club introductions', 'Interiors and staffing'],
    image: '1600121848594-d8644e57abab',
  },
]

export const whyChoose = [
  {
    title: 'A curated portfolio',
    text: 'Every residence we represent is visited, photographed and vetted by a director before it reaches the market.',
  },
  {
    title: 'Local depth, global reach',
    text: 'Deep roots in Austin and the West Coast, with buyer introductions through partner offices in London, Dubai and Singapore.',
  },
  {
    title: 'End-to-end representation',
    text: 'Search, negotiation, inspection, financing and interiors handled by one team, with one point of contact.',
  },
  {
    title: 'Discreet and transparent',
    text: 'Confidentiality where it is required, and a written recommendation behind every number we quote.',
  },
]

export const values = [
  {
    icon: 'shield',
    title: 'Integrity',
    text: 'We recommend the property that is right for you, not the one that closes fastest — and we say so when a home is not.',
  },
  {
    icon: 'eye',
    title: 'Transparency',
    text: 'Fees, comparables and risks are documented up front, in writing, before you commit to anything.',
  },
  {
    icon: 'heart',
    title: 'Client satisfaction',
    text: 'Most of our work arrives by referral, which is the only measure of service we trust.',
  },
]
