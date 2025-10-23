export function calcTotal(buildData, allOptionsByTab) {
  let total = 0;

  // Loop through each component type (case, cpu, gpu, etc.)
  for (const [category, selectedId] of Object.entries(buildData)) {
    if (!selectedId) continue; // skip if not selected

    const options = allOptionsByTab[category];
    if (!options) continue;

    // Find the selected part by ID
    const selectedPart = options.find((part) => part.id === selectedId);

    if (selectedPart?.price) {
      total += Number(selectedPart.price);
    }
  }

  return total;
}