import { Highlight, themes } from "prism-react-renderer";

type CodeSectionProps = {
  code: string;
  language: string;
};

function CodeSection({ code, language }: CodeSectionProps) {
  return (
    <div id="analytics" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Built on Advanced <span className="text-[#6B0D00]">AI Architecture</span>
        </h2>
        <p className="text-xl text-gray-600">Deep neural networks combined with classical alpha-beta pruning</p>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-[#6B0D00] to-[#A01000] rounded-2xl opacity-25 group-hover:opacity-50 blur transition-all duration-300" />
        <div className="relative bg-[#011627] rounded-2xl p-8 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="ml-4 text-gray-400 text-sm font-mono font-bold">chess_ai_engine.py</span>
          </div>
          <Highlight
            theme={themes.nightOwl}
            code={code}
            language={language}
          >
            {({ style, tokens, getLineProps, getTokenProps }) => (
              <pre style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    <span>{i + 1}</span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
          <div className="absolute bottom-4 right-4">
            <div className="bg-[#012725] text-white px-4 py-2 rounded-lg text-sm font-medium">
              99.2% Accuracy
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CodeSection };