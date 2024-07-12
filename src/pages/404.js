import Navbar from "../components/Navbar";

export default function NotFoundPage(props){
    return(
        <>
            <Navbar links={[]}/>
            <h1 className="text-center text-light mt-4">Sorry, Page Not Found</h1>
        </>
    )
}