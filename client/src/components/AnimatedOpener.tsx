import React, {useState, useEffect} from 'react'

const AnimatedOpener = () => {
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() =>{
        setStartAnimation(true);
    }, [])
  return (
    <div className={`${startAnimation ? "opener-container" : ""}`}>
        <div className="opening-heading-wrapper">

                <div className={`${startAnimation ? "opening-heading-text" : ""}`}>
                    <h1>EAT</h1>
                    <h1>DO</h1>
                    <h1>DISCOVER</h1>
                </div>

        </div>
        <div className={`${startAnimation ? "auckland-heading-wrapper" : ""}`}>
            <h1>AUCKLAND</h1>
        </div>
    </div>
  )
}

export default AnimatedOpener