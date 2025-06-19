
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface IntegralControlsProps {
  lowerBound: number;
  upperBound: number;
  rectangleCount: number;
  integralValue: number;
  onLowerBoundChange: (value: number) => void;
  onUpperBoundChange: (value: number) => void;
  onRectangleCountChange: (value: number) => void;
}

export const IntegralControls = ({
  lowerBound,
  upperBound,
  rectangleCount,
  integralValue,
  onLowerBoundChange,
  onUpperBoundChange,
  onRectangleCountChange,
}: IntegralControlsProps) => {
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

      {/* Nombre de rectangles */}
      <div>
        <Label className="text-sm font-medium">
          Nombre de rectangles: {rectangleCount}
        </Label>
        <Slider
          value={[rectangleCount]}
          onValueChange={(value) => onRectangleCountChange(value[0])}
          min={5}
          max={200}
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
