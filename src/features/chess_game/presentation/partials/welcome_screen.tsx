import AIProfile from '@/shared/assets/ai_profile.jpg';

type WelcomeScreenProps = {
  startGame: () => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

function WelcomeScreen({ startGame, setVisible }: WelcomeScreenProps) {
    return (
      <div className='w-full max-w-260 mt-24 px-12 h-130 flex justify-center'>
        <div className='h-[70%] rounded-3xl border-8 border-red-950'>
          <div
            className='h-full rounded-3xl aspect-square bg-cover bg-center'
            style={{backgroundImage: `url(${AIProfile})`}}
          >
        </div>

        </div>
        <div className='w-full pt-8 pl-16 flex flex-col rounded-2xl'>
            <h1 className="pb-4 text-4xl font-bold text-gray-900">
              Play Against <span className="text-[#6B0D00]">Chess AI</span>
            </h1>
            <p className="pb-8 text-gray-600 text-lg leading-relaxed">
              A fast, responsive chess AI designed for serious gameplay. <br />
              Try the demo and explore intelligent move generation, deep analysis, and smooth play—right in your browser.
            </p>
            <button
              className='group relative h-16 w-52 text-xl font-semibold rounded-lg bg-linear-to-r from-[#6B0D00] to-[#8B1000] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer'
              onClick={() => {
                setVisible(false);
                startGame();
              }}
            >
              <span className='relative z-10'>Play Now</span>
              <div className="absolute inset-0 bg-linear-to-r from-[#8B1000] to-[#6B0D00] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
        </div>
      </div>
    )
}

export { WelcomeScreen };