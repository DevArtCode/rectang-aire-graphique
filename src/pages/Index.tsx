
import { useState } from "react";
import { MathGraph } from "@/components/MathGraph";
import { MathKeyboard } from "@/components/MathKeyboard";
import { IntegralControls } from "@/components/IntegralControls";
import { FunctionInput } from "@/components/FunctionInput";
import { Calculator } from "lucide-react";

const Index = () => {
  const [expression, setExpression] = useState("x^2");
  const [lowerBound, setLowerBound] = useState(-2);
  const [upperBound, setUpperBound] = useState(2);
  const [rectangleCount, setRectangleCount] = useState(20);
  const [integralValue, setIntegralValue] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Approximation d'Intégrales
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Méthode des rectangles avec visualisation graphique
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Graphique principal */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Graphique de la fonction
              </h2>
              <MathGraph
                expression={expression}
                lowerBound={lowerBound}
                upperBound={upperBound}
                rectangleCount={rectangleCount}
                onIntegralChange={setIntegralValue}
              />
            </div>
          </div>

          {/* Contrôles */}
          <div className="space-y-6">
            {/* Saisie de fonction */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Fonction f(x)
              </h3>
              <FunctionInput
                value={expression}
                onChange={setExpression}
              />
            </div>

            {/* Clavier mathématique */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Clavier mathématique
              </h3>
              <MathKeyboard
                onInput={(value) => setExpression(prev => prev + value)}
                onClear={() => setExpression("")}
                onBackspace={() => setExpression(prev => prev.slice(0, -1))}
              />
            </div>

            {/* Contrôles d'intégration */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Paramètres d'intégration
              </h3>
              <IntegralControls
                lowerBound={lowerBound}
                upperBound={upperBound}
                rectangleCount={rectangleCount}
                integralValue={integralValue}
                onLowerBoundChange={setLowerBound}
                onUpperBoundChange={setUpperBound}
                onRectangleCountChange={setRectangleCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
