function CTASection() {
  return (
    <div className="mt-8 max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Ready to Play <span className="text-[#6B0D00]">Against the AI?</span>
          </h2>
          <p className="text-xl text-black font-light mb-8 max-w-2xl mx-auto">
            Test your skills against our advanced chess AI and see how you measure up
          </p>
          <button className="bg-[#6B0D00] text-white px-10 py-5 rounded-xl font-bold text-lg cursor-pointer hover:bg-red-900 transition-all duration-300 hover:scale-105 shadow-xl">
            Start Playing Now
          </button>
        </div>
        <div className="absolute -bottom-10 -right-10 text-white/10 text-9xl font-serif">♚</div>
        <div className="absolute -top-10 -left-10 text-white/10 text-9xl font-serif">♛</div>
      </div>
    </div>
  )
}

export {CTASection};