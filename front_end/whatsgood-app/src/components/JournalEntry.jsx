import PlateEntry from "./PlateEntry"
import { useOutletContext } from "react-router-dom"
import { backEndApi } from "./utilities"
export default function JournalEntry(props){
    const { journal,foodData,setFoodName,foodName,foodList,foodAmount,setFoodAmount,setFoodList,journalList,setJournalList,user,unit,setUnit,setPlateList,setClick,click }  = props
    const plate_maker=()=>{
        let response = backEndApi.post(`journal/${journal.id}/plate/1/`).then((response)=>{ console.log(response)
        setClick(!click)
        }).catch((error)=>{
            console.log(error)
        })
    }
    const deleteJournal=()=>{
        let response = backEndApi.delete(`journal/${journal.id}/`,{"username":user}).then((response)=>{ console.log(response)
        setClick(!click)
        }).catch((error)=>{
            console.log(error)
        })
    }
    return(
        <div className="journalEntry">
            {journalList?
            <>
                <div>
                <h2>Journal Date {journal.created_at} </h2>
            
                <button onClick={deleteJournal}>delete journal</button>
                    <>
                        <button onClick={plate_maker}>start new plate</button>
                        {journal.plates.map((plate,index)=>{

                            return <PlateEntry key={plate.id} journal={journal} plate={plate} foodData={foodData} setFoodName={setFoodName} foodName={foodName} setJournalList={setJournalList} journalList={journalList} setFoodList={setFoodList} foodList={foodList} foodAmount={foodAmount} setFoodAmount={setFoodAmount} unit ={unit} setUnit={setUnit} setPlateList={setPlateList} setClick={setClick} click ={click }/>
                        })}
                    </>
                    
                </div>
            </>:null
            }
        </div>
    )
}