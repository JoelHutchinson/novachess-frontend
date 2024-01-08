import { User, Puzzle, SolveAttempt } from "./definitions";
import { genSaltSync, hashSync } from 'bcrypt-ts';

export async function fetchUser(email: string): Promise<User | undefined> {
  // Encode the email to ensure it's safe to include in a URL
  const encodedEmail = encodeURIComponent(email);

  const res = await fetch(`http://localhost:8080/api/users/${encodedEmail}`);

  if (res.status === 404) {
    return undefined; // User does not exist
  }

  if (!res.ok) {
    throw new Error('Failed to fetch data.');
  }

  const json = await res.json();
  
  return json;
}

export async function createUser(name: string, email: string, plainPassword: string) {
  let salt = genSaltSync(10);
  let password = hashSync(plainPassword, salt);

  const res = await fetch('http://localhost:8080/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to create user.');
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

// Solve attempts
export async function fetchSolveAttempts(): Promise<SolveAttempt[]> {
  const res = await fetch('http://localhost:8080/api/solveattempts');

  if (!res.ok) {
      throw new Error('Failed to fetch solve attempts.');
  }

  const json = await res.json();
  return json._embedded.solveAttempts;
}

export async function postSolveAttempt(attempt: SolveAttempt): Promise<SolveAttempt> {
  const res = await fetch('http://localhost:8080/api/solveattempts', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(attempt),
  });

  if (!res.ok) {
      throw new Error('Failed to post solve attempt.');
  }

  const json = await res.json();
  return json;
}