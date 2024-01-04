import { User, Puzzle } from "./definitions";

export async function fetchUser(email: string): Promise<User | undefined> {
  // Encode the email to ensure it's safe to include in a URL
  const encodedEmail = encodeURIComponent(email);

  // Updated URL to use path variable
  const res = await fetch(`http://localhost:8080/api/users/${encodedEmail}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data.');
  }

  const json = await res.json();

  return json;
}



export async function fetchPuzzle(): Promise<Puzzle | undefined> {
    const res = await fetch('http://localhost:8080/api/puzzles')
    // The return value is *not* serialized
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data.')
    }

    const json = await res.json()
   
    return json._embedded.puzzles[0];
}