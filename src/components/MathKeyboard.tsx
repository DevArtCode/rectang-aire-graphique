
import { Button } from "@/components/ui/button";

interface MathKeyboardProps {
  onInput: (value: string) => void;
  onClear: () => void;
  onBackspace: () => void;
}

export const MathKeyboard = ({ onInput, onClear, onBackspace }: MathKeyboardProps) => {
  const buttons = [
    ["7", "8", "9", "/", "sin"],
    ["4", "5", "6", "*", "cos"],
    ["1", "2", "3", "-", "tan"],
    ["0", ".", "x", "+", "ln"],
    ["(", ")", "^", "√", "e^"],
    ["π", "φ", "e", "abs", "log"],
  ];

  const handleInput = (btn: string) => {
    switch (btn) {
      case "sin":
        onInput("sin(");
        break;
      case "cos":
        onInput("cos(");
        break;
      case "tan":
        onInput("tan(");
        break;
      case "ln":
        onInput("ln(");
        break;
      case "log":
        onInput("log(");
        break;
      case "√":
        onInput("sqrt(");
        break;
      case "e^":
        onInput("exp(");
        break;
      case "abs":
        onInput("abs(");
        break;
      case "π":
        onInput("3.14159265359");
        break;
      case "φ":
        onInput("1.61803398875");
        break;
      case "e":
        onInput("2.71828182846");
        break;
      default:
        onInput(btn);
    }
  };

  return (
    <div className="space-y-2">
      {buttons.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2">
          {row.map((btn) => (
            <Button
              key={btn}
              variant="outline"
              size="sm"
              className="flex-1 h-10 text-sm font-medium hover:bg-indigo-50 hover:border-indigo-300"
              onClick={() => handleInput(btn)}
            >
              {btn}
            </Button>
          ))}
        </div>
      ))}
      <div className="flex gap-2 mt-3">
        <Button
          variant="destructive"
          size="sm"
          className="flex-1"
          onClick={onClear}
        >
          Effacer
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="flex-1"
          onClick={onBackspace}
        >
          ←
        </Button>
      </div>
    </div>
  );
};
