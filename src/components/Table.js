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
                {props.content && props.content.length > 0 ? props.content.map((row,trIdx)=>{
                    return(
                        <tr key={trIdx}>
                            {row && row.length > 0? row.map((rowContent,tdIdx)=>{
                                return(
                                    <td key={tdIdx}>{rowContent}</td>
                                )
                            }): null}
                        </tr>
                    )
                }): null}
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