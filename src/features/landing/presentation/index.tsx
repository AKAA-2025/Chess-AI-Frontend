import { HeroSection, CTASection, Footer, FeaturesGrid, CodeSection, PerformanceGraph } from './partials';

const LandingPage = () => {
  const codeSnippet = `
    class ChessAI:
        def __init__(self, depth=5):
            self.depth = depth
            self.neural_net = NeuralNetwork(layers=[768, 512, 256, 1])
            self.position_cache = {}
            
        def evaluate_position(self, board):
            # Extract features from board state
            features = self.extract_features(board)
            
            # Neural network evaluation
            score = self.neural_net.forward(features)
            
            # Combine with traditional evaluation
            material = self.evaluate_material(board)
            position = self.evaluate_position_value(board)
            
            return 0.7 * score + 0.2 * material + 0.1 * position
        
        def find_best_move(self, board):
            # Alpha-beta pruning with neural guidance
            best_move = None
            alpha, beta = -float('inf'), float('inf')
            
            for move in board.legal_moves:
                board.push(move)
                value = -self.minimax(board, self.depth-1, -beta, -alpha)
                board.pop()
                
                if value > alpha:
                    alpha = value
                    best_move = move
                    
            return best_move, alpha
  `;

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-white to-red-50">
      <HeroSection />

      <FeaturesGrid />

      <CodeSection code={codeSnippet} language='python'/>

      <PerformanceGraph />

      <CTASection />

      <Footer />
    </div>
  );
};

export default LandingPage;