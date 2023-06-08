import { useEffect, useState } from "react";
import TermPolicy from "./Footer-Term&Policy";
import Navigation from "./NavBar";
import Footerapp from "./Footer-app";
import TermsAndPolicies from "./AcceptPolicy";

function TermandPolicy(){
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/api/term-policy')
        .then((res) => res.json())
        .then((data) => setData(data));
    },[])

    console.log('data', data);
    return (
        <div>
            <Navigation />
            <p>Term & Policy</p>
            <div>
                {data.lenght === 0 ?(
                    <p>No data to display</p>
                ) : (
                    <p>
                        {data.map((item) =>(
                            <p>{item.terms}</p>)
                            
                        )}
                    </p>
                )}
            
            </div>
            <Footerapp/>
        </div>
    )
}

export default TermandPolicy;

