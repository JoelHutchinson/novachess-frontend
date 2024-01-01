export async function fetchPuzzles() {
    const res = await fetch('https://localhost:8080/puzzles')
    // The return value is *not* serialized
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data.')
    }

    const json = await res.json()
   
    return json;
}