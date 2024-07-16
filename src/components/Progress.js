export default function ProgressBar(props){
    return(
        <div className="progress">
            <div className="progress-bar" role="progressbar" style={{width: `${props.percentage}%`}} aria-valuenow={props.percentage} aria-valuemin="0" aria-valuemax="100">{props.percentage}%</div>
        </div>
    )
}