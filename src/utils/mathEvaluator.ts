
export const evaluateExpression = (expression: string, x: number): number => {
  // Remplacer x par sa valeur
  let expr = expression.replace(/x/g, x.toString());
  
  // Remplacer les fonctions mathématiques
  expr = expr.replace(/sin\(/g, 'Math.sin(');
  expr = expr.replace(/cos\(/g, 'Math.cos(');
  expr = expr.replace(/tan\(/g, 'Math.tan(');
  expr = expr.replace(/ln\(/g, 'Math.log(');
  expr = expr.replace(/log\(/g, 'Math.log(');
  expr = expr.replace(/exp\(/g, 'Math.exp(');
  expr = expr.replace(/sqrt\(/g, 'Math.sqrt(');
  expr = expr.replace(/abs\(/g, 'Math.abs(');
  
  // Remplacer les puissances ^ par **
  expr = expr.replace(/\^/g, '**');
  
  // Gérer la multiplication implicite (comme 2x -> 2*x)
  expr = expr.replace(/(\d)([a-zA-Z])/g, '$1*$2');
  expr = expr.replace(/(\))(\d)/g, '$1*$2');
  expr = expr.replace(/(\d)(\()/g, '$1*$2');
  
  try {
    // Évaluer l'expression de façon sécurisée
    const result = Function('"use strict"; return (' + expr + ')')();
    
    if (typeof result !== 'number' || !isFinite(result)) {
      throw new Error('Résultat invalide');
    }
    
    return result;
  } catch (error) {
    console.warn('Erreur d\'évaluation pour x =', x, ':', error);
    throw error;
  }
};
