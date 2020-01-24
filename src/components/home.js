import React from 'react';

const Home = () => {

    return(
    <>
        <h1>Treklister Home</h1>
        <div id='iframeContainer'>
        <iframe 
        width="1000" 
        height="600" 
        src="https://www.youtube.com/embed/R-ekRgefOZI" 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen='true'
        align='middle'>
        </iframe>
        </div>
        <br/>
        <p id='homePageDesc'>Treklister is a web application designed
            with travelers in mind. It lets you create
            trips which include two dynamic check lists.
            One list for things you can't forget before
            leaving, and a second to make sure you don't leave anything behind. 
            Since the lists are 
            dynamic they can be added to, deleted from,
            and edited on the fly. Your trips are all 
            saved in our database and can easily be 
            reused as many times as you like. To get 
            started signup today using the navigation bar above!
        </p>
        
    </>
    )
}

export default Home;