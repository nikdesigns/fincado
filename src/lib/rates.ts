export function getRateUpdatedText() {
  const now = new Date();

  return now.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
