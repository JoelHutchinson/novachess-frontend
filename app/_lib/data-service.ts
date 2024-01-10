import { User, Puzzle } from "./definitions";
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

  let puzzleRating = 1000; // Default rating

  const res = await fetch('http://localhost:8080/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password, puzzleRating }),
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to create user.');
  }

  const json = await res.json();

  return json;
}

export async function fetchUserPuzzle(email: string): Promise<Puzzle | undefined> {
  // Encode the email to ensure it's safe to include in a URL
  const encodedEmail = encodeURIComponent(email);

  // Fetch user data
  const userRes = await fetch(`http://localhost:8080/api/users/${encodedEmail}`);

  if (!userRes.ok) {
    // Handle errors in fetching user data
    throw new Error('Failed to fetch user data.');
  }

  const userJson = await userRes.json();

  // Check if user has a current puzzle link
  const currentPuzzleLink = userJson._links?.currentPuzzle?.href;
  if (!currentPuzzleLink) {
    return undefined; // No current puzzle for this user
  }

  // Fetch the current puzzle using the HATEOAS link
  const puzzleRes = await fetch(currentPuzzleLink);

  if (!puzzleRes.ok) {
    // Handle errors in fetching puzzle data
    throw new Error('Failed to fetch current puzzle.');
  }

  const puzzleJson = await puzzleRes.json();

  return puzzleJson;
}


// Solve attempts
export async function postSolveAttempt(userEmail: string, isCorrect: boolean): Promise<User | undefined> {
  // Encode the email to ensure it's safe to include in a URL
  const encodedEmail = encodeURIComponent(userEmail);

  const attempt = {
    isCorrect
  };

  const res = await fetch(`http://localhost:8080/api/users/${encodedEmail}/logSolve`, {
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