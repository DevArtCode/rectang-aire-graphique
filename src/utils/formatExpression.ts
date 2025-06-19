
export const formatExpressionForDisplay = (expression: string): string => {
  let formatted = expression;
  
  // Remplacer exp( par e^(
  formatted = formatted.replace(/exp\(/g, 'e^(');
  
  // Remplacer sqrt( par √(
  formatted = formatted.replace(/sqrt\(/g, '√(');
  
  // Remplacer les constantes par leurs symboles
  formatted = formatted.replace(/3\.14159265359/g, 'π');
  formatted = formatted.replace(/1\.61803398875/g, 'φ');
  formatted = formatted.replace(/2\.71828182846/g, 'e');
  
  // Améliorer l'affichage des puissances (basique, sans vraie mise en exposant LaTeX)
  formatted = formatted.replace(/\^(\d+)/g, '^$1');
  formatted = formatted.replace(/\^(\([^)]+\))/g, '^$1');
  
  return formatted;
};
