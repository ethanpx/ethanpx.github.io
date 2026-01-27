import Container from '@/components/UIs/Container'

const TERMS = [
  {
    title: '1. Acceptance of Terms',
    desc: [
      'By accessing or using PrimeVaults, you agree to comply with these Terms & Conditions. If you do not agree, please stop using the service.',
    ],
  },
  {
    title: '2. Scope of Service',
    desc: [
      'PrimeVaults provides an AI-driven platform designed to optimize yields on digital assets by:',
      'Using AI to analyze market data.',
      'Automatically allocating assets into DeFi strategies such as lending, liquidity provision (LP), and restaking.',
      'Applying built-in risk controls such as reserve funds and dynamic fee mechanisms.',
    ],
  },
  {
    title: '3. No Guaranteed Returns',
    desc: [
      'While PrimeVaults is designed to optimize returns, no fixed or guaranteed yield is promised. Actual returns may vary depending on market conditions and blockchain performance.',
    ],
  },
  {
    title: '4. User Responsibility',
    desc: [
      'Users are solely responsible for evaluating whether PrimeVaults fits their financial goals and risk appetite.',
    ],
  },
  {
    title: '5. Lock & Withdrawals',
    desc: [
      'PrimeVaults applies an 8-day lock period to ensure safe unwinding of yield positions and accurate reallocation of assets.',
      'Users may withdraw after the lock period ends. Yield generated during the unlock phase will be distributed to active stakers, incentivizing long-term participation.',
      'PrimeVaults ensures users always receive their principal, with any realized IL covered by the IL Reserve Fund.',
    ],
  },
  {
    title: '6. Limitation of Liability',
    desc: [
      'PrimeVaults is not liable for losses caused by:',
      'Market crashes or extreme volatility.',
      'Failures in blockchain networks or third-party smart contracts.',
      'Force majeure events beyond our reasonable control.',
    ],
  },
  {
    title: '7. Amendments',
    desc: [
      'PrimeVaults reserves the right to update these Terms & Conditions at any time. Continued use of the service constitutes acceptance of the updated terms.',
    ],
  },
]

export default function TermOfUsePage() {
  return (
    <Container
      className="h-full"
      innerClassName="bg-base-300 border-x border-neutral h-full"
    >
      <div className="flex flex-col px-8 py-16 bg-[#141510] gap-7 font-medium">
        <div className="flex flex-col gap-2">
          <p className="text-[40px] text-[#FCFCFD]">
            Terms & Conditions – PrimeVaults
          </p>
          <p className="text-[#ABB1BA]">Version dated Sep 18, 2025</p>
        </div>
        {TERMS.map((term, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <p className="text-[#FCFCFD]">{term.title}</p>
            {term.desc.map((desc, idx) => (
              <p key={idx} className="text-[#ABB1BA]">
                {desc}
              </p>
            ))}
          </div>
        ))}
      </div>
    </Container>
  )
}
