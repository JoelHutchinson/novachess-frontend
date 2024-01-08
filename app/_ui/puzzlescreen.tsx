import React, { useState, useEffect } from "react";

import PuzzleLoader from "./puzzleloader";
import { auth, signOut } from '@/app/auth';

export default async function PuzzleScreen() {
    const session = await auth();

    return (
        session ?
        (<PuzzleLoader session={session} />) : <div>Loading</div>
    );
}
