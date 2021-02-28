import React, { Component } from "react";
// import Question from "../Help/Question";
// import Answer from "../Help/Answer";
import classes from "./Help.css";

const faqArray = [
  {
    id: 1,
    question:"How much do i have to pay for the app?",
    answer: "This app is free. You will only be charged for reservations that you make, uppon confirmation."
  },
  {
    id:2,
    question:"Is there a limit on points?",
    answer: "You have the limit of 150000 points. Points suffer a reset every year."
  },
  {
    id:3,
    question:"Can i cancel a reservation?",
    answer: "Yes, you can cancel your reservation, up to 48hours. You will loose the points rewarded by this reservation and nothing will be charge to your account. C"
  },
  {
    id:4,
    question:"How can i get points?",
    answer: "You can get more points by making new reservations."
  },
  {
    id:5,
    question:"How do you measure my consumption?",
    answer: "By monotoring each room, in terms of water/electricity consuption, we can give you a correct information about your staying consumptions."
  },
  {
    id:6,
    question:"Can i see my consuptions, even months after the reservation?",
    answer: "Your consumption data will be available for 6 months."
  },
  {
    id:7,
    question:"I want to make a reservation at a hotel, but it doesn't show on the listings. What can i do?",
    answer: "If there's an hotel that you would like to see on our listings, contact us, and we will present noytrall to them."
  },
  {
    id:8,
    question:"Can i have the noytrall app installed in 2 different devices?",
    answer: "Yes, you can have noytrall in more than one device."
  },
]

class Help extends Component{
  state= {
    showingAnswer: false
  }

  questionClickHandler = () => {
    this.setState({showingAnswer: true})
  }
  render() {
    const questionsSumary = faqArray.map((qid) => {
      return (
        <div key={qid.id}>
          <p className={classes.question}>
            {qid.question}
          </p>
          <p className = {classes.answer}>{qid.answer}</p>
          <hr/>
        </div>
      );
    });

    return (
      <div className={classes.helpSection}>
          <h3 className={classes.title}>FAQ</h3>
          {/* <Question onClick={() => {console.log("clicked!")}}/> */}
          <div onClick={this.questionClickHandler}>{questionsSumary}</div>
          <p>Contact form</p>
          {/* <Answer /> */}
         
      </div>
  )
    
  }

}

export default Help;