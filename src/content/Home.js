import HeaderAuthed from "./HeaderAuthed";

const Home = () => {
    return(
        <>  
            <HeaderAuthed />
            <div className="content">
                <h1 className="centerText">There is no place like home.</h1>
            </div>
        </>
    );
}

export default Home;