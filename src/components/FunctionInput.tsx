
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatExpressionForDisplay } from "@/utils/formatExpression";

interface FunctionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const FunctionInput = ({ value, onChange }: FunctionInputProps) => {
  const displayExpression = formatExpressionForDisplay(value);
  
  return (
    <div className="space-y-2">
      <Label htmlFor="function-input" className="text-sm font-medium">
        f(x) =
      </Label>
      <Input
        id="function-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Entrez votre fonction (ex: x^2, sin(x), etc.)"
        className="font-mono text-lg"
      />
      {/* Affichage formaté de la fonction */}
      <div className="bg-gray-50 p-3 rounded-md border">
        <div className="text-sm text-gray-600 mb-1">Aperçu de la fonction :</div>
        <div className="text-lg font-semibold text-gray-800 font-mono">
          f(x) = {displayExpression}
        </div>
      </div>
      <p className="text-xs text-gray-500">
        Utilisez x comme variable. Fonctions : +, -, *, /, ^, sin, cos, tan, ln, exp, √, abs, log
        <br />
        Constantes : π, φ, e
      </p>
    </div>
  );
};
