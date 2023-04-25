import React from 'react'
import './Home.css'
import idea from '../assets/idea.jpg'


const Home = () => {
  return (
    <div className="Home">
        <img src={ idea } alt="Turn your ideas into reality!" className="float-right" style={{width: "40%", height: "40%"}}/>
        <div className="HomeText">
          <h2>Ideate with Epiph</h2>
          <h4>Epiph is a repository for big and small ideas alike, from all walks of life and experiences from passionate innovators across the world! <br />
          Come share your inspiration and find collaborators to start your project!</h4>
          <p>You’ve got ideas, we know it. Those ideas have potential! <br /> 
          Maybe you need a little push, or your stuck on how to get the idea into something the world can appreciate. <br /> <br /> 
          You need a community backing you up. And that is what we are here to do!<br /><br />
          Whether you are a solo ideator or you have a stream team of big thinkers, Epiph is your new hub! <br />
          There is plenty to explore for those who are passionate about setting the future and not waiting around for its arrival. <br /><br />
          Join the next big thing… Epiph! Get started by submitting your idea, then explore a stream of ideas. <br />
          Get motivated, leave feedback and get started in making the next EPIC idea a REALITY!</p>
        </div>
    </div>
  )
}

export default Home