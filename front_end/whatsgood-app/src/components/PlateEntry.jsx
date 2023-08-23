export default function PlateEntry(){
    return(
    <div className="ingredient">
        <h3>plate id</h3>
        <ul>
            {/* foodList? foodList.map((food)=>{
                return <li>food.description<li><button>delete</button>
            }) */}
            <li>food item</li>
            <label>Choose units:
                <select name="units" id="units">
                    <option>g</option>
                    <option>mg</option>
                    <option>oz</option>
                </select>
                <input type="text" 
                placeholder="enter amount"
                />
            </label>
            <button>add amount</button>
            <button>delete</button>
            <li>food item</li>
            <label>Choose units:
                <select name="units" id="units">
                    <option>g</option>
                    <option>mg</option>
                    <option>oz</option>
                </select>
                <input type="text" 
                placeholder="enter amount"
                />
            </label>
            <button>add amount</button>
            <button>delete</button>
        </ul>
        <button>save plate</button>
        <button>delete plate</button>
    </div>
    )
}