
import { useEffect, useState, useMemo } from "react";
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts";
import { evaluateExpression } from "@/utils/mathEvaluator";

interface MathGraphProps {
  expression: string;
  lowerBound: number;
  upperBound: number;
  rectangleCount: number;
  onIntegralChange: (value: number) => void;
}

export const MathGraph = ({
  expression,
  lowerBound,
  upperBound,
  rectangleCount,
  onIntegralChange,
}: MathGraphProps) => {
  const [graphData, setGraphData] = useState<any[]>([]);
  const [rectangleData, setRectangleData] = useState<any[]>([]);

  // Générer les données du graphique
  const generateGraphData = useMemo(() => {
    const data = [];
    const range = 8; // Plage de -4 à 4 pour l'affichage
    const steps = 400; // Plus de points pour une courbe lisse
    const stepSize = (2 * range) / steps;

    for (let i = 0; i <= steps; i++) {
      const x = -range + i * stepSize;
      try {
        const y = evaluateExpression(expression, x);
        if (isFinite(y)) {
          data.push({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)) });
        }
      } catch (error) {
        // Ignorer les points où l'évaluation échoue
      }
    }
    return data;
  }, [expression]);

  // Générer les rectangles pour l'approximation
  const generateRectangles = useMemo(() => {
    if (lowerBound >= upperBound) return [];
    
    const rectangles = [];
    const width = (upperBound - lowerBound) / rectangleCount;
    let integralSum = 0;

    for (let i = 0; i < rectangleCount; i++) {
      const x = lowerBound + i * width;
      const midPoint = x + width / 2; // Méthode du point milieu pour plus de précision
      
      try {
        const height = evaluateExpression(expression, midPoint);
        if (isFinite(height)) {
          integralSum += height * width;
          
          // Créer les points pour dessiner le rectangle
          rectangles.push(
            { x: Number(x.toFixed(3)), rectangleHeight: 0, y: 0 },
            { x: Number(x.toFixed(3)), rectangleHeight: Number(height.toFixed(3)), y: Number(height.toFixed(3)) },
            { x: Number((x + width).toFixed(3)), rectangleHeight: Number(height.toFixed(3)), y: Number(height.toFixed(3)) },
            { x: Number((x + width).toFixed(3)), rectangleHeight: 0, y: 0 }
          );
        }
      } catch (error) {
        // Ignorer les rectangles où l'évaluation échoue
      }
    }

    onIntegralChange(integralSum);
    return rectangles;
  }, [expression, lowerBound, upperBound, rectangleCount, onIntegralChange]);

  useEffect(() => {
    setGraphData(generateGraphData);
  }, [generateGraphData]);

  useEffect(() => {
    setRectangleData(generateRectangles);
  }, [generateRectangles]);

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={graphData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis 
            dataKey="x" 
            type="number" 
            scale="linear"
            domain={[-4, 4]}
            tickCount={9}
            stroke="#6366f1"
          />
          <YAxis 
            type="number" 
            domain={[-10, 10]}
            tickCount={11}
            stroke="#6366f1"
          />
          
          {/* Lignes de référence pour les axes */}
          <ReferenceLine x={0} stroke="#9ca3af" strokeWidth={1} />
          <ReferenceLine y={0} stroke="#9ca3af" strokeWidth={1} />
          
          {/* Bornes d'intégration */}
          <ReferenceLine x={lowerBound} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
          <ReferenceLine x={upperBound} stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
          
          {/* Aire des rectangles */}
          <Area
            data={rectangleData}
            dataKey="rectangleHeight"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.3}
            strokeWidth={1}
          />
          
          {/* Courbe de la fonction */}
          <Line
            type="monotone"
            dataKey="y"
            stroke="#1d4ed8"
            strokeWidth={3}
            dot={false}
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>
          <span className="inline-block w-4 h-2 bg-blue-700 mr-2"></span>
          Fonction f(x) = {expression}
        </p>
        <p className="mt-1">
          <span className="inline-block w-4 h-2 bg-purple-500 opacity-50 mr-2"></span>
          Approximation par {rectangleCount} rectangles
        </p>
      </div>
    </div>
  );
};
