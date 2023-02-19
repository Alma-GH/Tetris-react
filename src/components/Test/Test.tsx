import React, {useEffect, useState} from 'react';

interface Obj{
    val1: number,
    val2: string
}

const Test = () => {

    const [value, setValue] = useState<Obj | null>()

    useEffect(()=>{
        setValue({
            val1: 2,
            val2: "2"
        })
        return ()=>{}
    }, [])

    return (
        <div>
        </div>
    );
};

export default Test;

