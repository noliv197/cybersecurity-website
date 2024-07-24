import PostService from "../services/http-service";

export default function Logout(props){
    const logout = () => {
        sessionStorage.removeItem('sid');
        sessionStorage.removeItem('user');
        props.setUser('');
        props.setSid('');

        const sessionData = new FormData();
        sessionData.append('sid', props.sid);
        PostService.post('logout', sessionData).then(
            (response) => {
                console.log(response);
            },
            (err) => {
                console.log(JSON.stringify(err.response));
            }
        )
    }

    return(
        <button className="btn btn-light" onClick={logout}>Logout</button>
    )
}