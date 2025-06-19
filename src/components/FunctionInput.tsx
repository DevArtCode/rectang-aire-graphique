
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FunctionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const FunctionInput = ({ value, onChange }: FunctionInputProps) => {
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
      <p className="text-xs text-gray-500">
        Utilisez x comme variable. Fonctions supportées : +, -, *, /, ^, sin, cos, tan, ln, exp, sqrt, abs
      </p>
    </div>
  );
};
