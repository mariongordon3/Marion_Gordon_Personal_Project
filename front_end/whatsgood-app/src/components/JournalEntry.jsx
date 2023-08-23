import PlateEntry from "./PlateEntry"
import { useOutletContext } from "react-router-dom"

export default function JournalEntry(props){
    {}
    return(
        <div>
            <div className="journal">
            <button>save journal</button>
            <button>delete journal</button>
            <PlateEntry />
            <PlateEntry />
            </div>
        </div>
    )
}