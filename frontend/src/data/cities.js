export async function getCities() {
  const response = await fetch("http://localhost:8000/api/cities/");
  const data = await response.json();
  return data;
}
