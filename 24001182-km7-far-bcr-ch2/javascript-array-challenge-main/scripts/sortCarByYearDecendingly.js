function sortCarByYearDescendingly(cars) {
  // Sangat dianjurkan untuk console.log semua hal hehe
  console.log(cars);

  // Clone array untuk menghindari side-effect
  // Apa itu side effect?
  const result = [...cars];

  // Tulis code-mu disini
  for (i = 0; i < result.length - 1; i++) {
    for (j = 0; j < result.length - i - 1; j++) {
      if (result[j].year < result[j + 1].year) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }

  // Rubah code ini dengan array hasil sorting secara descending
  return result;
}
