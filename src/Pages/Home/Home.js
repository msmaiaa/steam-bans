import React from 'react';

export default function Home(){
    const handleSearch = () =>{
        console.log('search')
    }
    return(
        <section className="home">
            <div className="homeContent">
                <h2 className="homeContent__title">Track steam users information.</h2>
                <div className="card shadow-black">
                    <header>
                        <p className="homeContent__header-text">Welcome to <strong className="text-strong">steam-bans</strong>! This is a tool which allows you to track the ban status for any <strong className="text-strong">STEAMID</strong> and if you wish you can save it to a list. 
                        Optionally you can get notified via <strong className="text-strong" style={{color:'#6E85D3'}}>discord</strong> or <strong className="text-strong">email</strong> when the user gets banned!</p>
                    </header>
                    <div className="supportedIds">
                        <h2 className="supportedIds__title">Supported Input Format</h2>
                        <ul className="supportedIds__list">
                            <li className="supportedIds__list-item">SteamID</li>
                            <li className="supportedIds__list-item">SteamID3</li>
                            <li className="supportedIds__list-item">SteamID64</li>
                            <li className="supportedIds__list-item">Custom URL</li>
                            <li className="supportedIds__list-item">Complete URL</li>
                        </ul>
                    </div>
                    <input type="text" className="searchInput" placeholder="SteamID/Link Here"></input>
                    <div className="buttonArea" onClick={handleSearch}>
                        <button className="searchButton">Search</button>
                    </div>
                </div>
            </div>
        </section>
    )
}