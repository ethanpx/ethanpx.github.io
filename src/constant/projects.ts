export interface Project {
  title: string
  description: string
  link: string
  tags: string[]
  img: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Prime Vaults',
    description:
      'Prime Vaults are smart saving accounts delivering best returns for BTC, ETH, and USD through cross-chain lending, liquidity provision, and restaking with Prime AI driving intelligent analysis for optimal performance.',
    link: 'https://primevaults.finance',
    tags: ['React.js', 'TypeScript', 'TailwindCSS'],
    img: 'prime-vault',
  },
  {
    title: 'JIKO',
    description:
      'JIKO is a yield optimizer powering a PvP idle card game. With single-staked pools, we maximize yields via POL on Berachain, making finance fun and profitable.',
    link: 'https://app.jiko.finance/',
    tags: ['React.js', 'TypeScript', 'TailwindCSS'],
    img: 'jiko',
  },
  {
    title: 'Berasig',
    description:
      'BeraSig is a gamified mobile portal of Berachain for managing assets and utilizing highly efficient DeFi apps',
    link: 'https://berasig-home.onrender.com/',
    tags: ['React.js', 'Next.js', 'TailwindCSS', 'TypeScript'],
    img: 'berasig',
  },
  {
    title: 'Beraji',
    description:
      'Beraji is an engagement-driven ecosystem that boosts NFT values and on-chain activity via gamification.',
    link: 'https://beraji.onrender.com/',
    tags: ['React.js', 'TypeScript', 'TailwindCSS'],
    img: 'beraji',
  },
  {
    title: 'Beraji Bear',
    description:
      'Break free, be playful, and find your joy again. Beraji Bears is your invitation to reconnect with the child within.',
    link: 'https://beraji-bear.onrender.com/',
    tags: ['React.js', 'TypeScript', 'TailwindCSS'],
    img: 'beraji-bear',
  },
  {
    title: 'Desig',
    description: 'The Blockchain-Agnostic Multisig Solution',
    link: 'https://desig.onrender.com/',
    tags: ['React.js', 'TypeScript', 'TailwindCSS'],
    img: 'desig',
  },
  {
    title: 'Descartes network',
    description:
      'Blockchain experts for hire, ready 24/7. World-class outsourcing, consulting and in-house dev team building services.',
    img: 'descartes',
    link: 'https://desnet-9nx7.onrender.com/',
    tags: ['React.js', 'Next.js', 'TypeScript', 'TailwindCSS'],
  },
]
