import type { JSX } from "react"

type featuresCardProps = {
  title: string,
  icon: JSX.Element,
  desc: string,
}

function FeaturesCard({ title, icon, desc }: featuresCardProps) {
  return (
    <div className="group p-8 rounded-2xl bg-white border border-gray-200 shadow-red-900/20 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="w-14 h-14 bg-linear-to-br from-[#6B0D00] to-[#8B1000] rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}

export { FeaturesCard };