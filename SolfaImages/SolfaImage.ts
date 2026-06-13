// Mapping nom de fichier → image require()
// require() doit être statique, donc on liste chaque image ici.
// Ajoute une ligne pour chaque nouveau solfa.
export const solfaImages: Record<string, any> = {
    'solfa1.png': require('@/assets/images/solfa1.png'),
    'solfa2.png': require('@/assets/images/solfa2.png'),
    'solfa3.png': require('@/assets/images/solfa3.png'),
    'solfa4.png': require('@/assets/images/solfa4.png'),
  };