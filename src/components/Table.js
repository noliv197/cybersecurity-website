export default function Table(props){
    return(
        <table className={`table table-striped table-${props.color?props.color:"dark"} w-75`}>
            <thead>
                <tr>
                    {props.header.map((name,idx)=>{
                        return(
                            <th key={idx}>{name}</th>   
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {props.content.map((row,trIdx)=>{
                    return(
                        <tr key={trIdx}>
                            {row.map((rowContent,tdIdx)=>{
                                return(
                                    <td key={tdIdx}>{rowContent}</td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
            {props.tfoot ? (
                props.tfoot.map((row,trIdx)=>{
                    return(
                        <tr key={trIdx}>
                            {row.map((rowContent,tdIdx)=>{
                                return(
                                    <td key={tdIdx}>{rowContent}</td>
                                )
                            })}
                        </tr>
                    )
                })
            ): null}
        </table>
    )
}