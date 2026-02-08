const ACCENT = '#166534'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f7f6f3]">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 pt-24 pb-20 md:pt-28 md:pb-24">
        <header>
          <h1 className="text-[30px] leading-tight sm:text-[34px] md:text-[40px] lg:text-[44px] font-bold tracking-tight text-[#0b0d12]">
            Hey, I'm <span style={{ color: ACCENT }}>Sohan Lele</span>
          </h1>
        </header>

        <div className="mt-8 space-y-8">
          <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#374151]">
            I'm a product design engineer with a strong interest in hardware and robotics. I enjoy technical problem solving, but I'm just as focused on how those systems turn into products people actually interact with.
          </p>
          <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#374151]">
            I like thinking through tradeoffs, especially where engineering decisions shape usability, reliability, and real-world performance. I enjoy working close to execution and taking on team leadership when needed, particularly in fast-moving or ambiguous environments.
          </p>
          <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#374151]">
            Outside of engineering, I spend a lot of time in the gym lifting and training MMA. I'm also currently building a startup focused on automating personal training for gyms. You can learn more about IRIX at{' '}
            <a
              href="https://tryirix.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: ACCENT }}
            >
              tryirix.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
