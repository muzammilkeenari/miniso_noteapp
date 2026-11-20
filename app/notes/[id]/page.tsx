import NoteEdit from "./NoteEdit";
import {Suspense} from "react";

export default function Note() {
    return (
        <Suspense fallback={<p className="text-center my-10 text-xl">Loading...</p>}>
            <NoteEdit />
        </Suspense>
    )
}