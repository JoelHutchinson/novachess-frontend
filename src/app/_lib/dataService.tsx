
export async function fetchPuzzle() {
    const res = await fetch('http://localhost:8080/api/puzzles')
    // The return value is *not* serialized
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data.')
    }

    const json = await res.json()
   
    return json._embedded.puzzles[0];
}