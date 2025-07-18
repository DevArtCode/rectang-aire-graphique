
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IntegralControlsProps {
  lowerBound: number;
  upperBound: number;
  rectangleCount: number;
  integralValue: number;
  onLowerBoundChange: (value: number) => void;
  onUpperBoundChange: (value: number) => void;
  onRectangleCountChange: (value: number) => void;
  onKeyboardInput: (value: string) => void;
}

export const IntegralControls = ({
  lowerBound,
  upperBound,
  rectangleCount,
  integralValue,
  onLowerBoundChange,
  onUpperBoundChange,
  onRectangleCountChange,
  onKeyboardInput,
}: IntegralControlsProps) => {
  const keyboardButtons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "-"];
  const constantButtons = [
    { label: "π", value: "3.14159265359" },
    { label: "e", value: "2.71828182846" },
    { label: "φ", value: "1.61803398875" },
    { label: "e²", value: "7.38905609893" },
    { label: "π²", value: "9.86960440109" },
    { label: "√2", value: "1.41421356237" },
  ];

  return (
    <div className="space-y-6">
      {/* Bornes d'intégration */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="lower-bound" className="text-sm font-medium">
            Borne inférieure (a)
          </Label>
          <Input
            id="lower-bound"
            type="number"
            value={lowerBound}
            onChange={(e) => onLowerBoundChange(parseFloat(e.target.value) || 0)}
            step="0.1"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="upper-bound" className="text-sm font-medium">
            Borne supérieure (b)
          </Label>
          <Input
            id="upper-bound"
            type="number"
            value={upperBound}
            onChange={(e) => onUpperBoundChange(parseFloat(e.target.value) || 0)}
            step="0.1"
            className="mt-1"
          />
        </div>
      </div>

      {/* Mini clavier pour les bornes */}
      <div>
        <Label className="text-sm font-medium mb-2 block">
          Clavier numérique
        </Label>
        <div className="grid grid-cols-4 gap-1 mb-2">
          {keyboardButtons.map((btn) => (
            <Button
              key={btn}
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => onKeyboardInput(btn)}
            >
              {btn}
            </Button>
          ))}
        </div>
        
        {/* Constantes mathématiques */}
        <Label className="text-xs text-gray-600 mb-1 block">
          Constantes mathématiques
        </Label>
        <div className="grid grid-cols-3 gap-1">
          {constantButtons.map((constant) => (
            <Button
              key={constant.label}
              variant="outline"
              size="sm"
              className="h-8 text-xs font-medium bg-indigo-50 hover:bg-indigo-100 border-indigo-200"
              onClick={() => onKeyboardInput(constant.value)}
            >
              {constant.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Nombre de rectangles */}
      <div>
        <Label className="text-sm font-medium">
          Nombre de rectangles: {rectangleCount}
        </Label>
        <Slider
          value={[rectangleCount]}
          onValueChange={(value) => onRectangleCountChange(value[0])}
          min={5}
          max={1000}
          step={5}
          className="mt-2"
        />
      </div>

      {/* Résultat */}
      <Card className="p-4 bg-indigo-50 border-indigo-200">
        <div className="text-center">
          <Label className="text-sm font-medium text-indigo-700">
            Approximation de l'intégrale
          </Label>
          <div className="text-2xl font-bold text-indigo-900 mt-1">
            ≈ {integralValue.toFixed(6)}
          </div>
        </div>
      </Card>
    </div>
  );
};
