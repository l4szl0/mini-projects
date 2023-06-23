//Selecting DOM elements
const startBtn = document.querySelector("#startBtn"),
    endBtn = document.querySelector("#endBtn"),
    prevNext = document.querySelectorAll(".prevNext"),
    numbers = document.querySelectorAll('.link');


//Setting an initial step
let currentStep = 0;

//Function to update the button states
const updateBtn = () => {
    //if we are at the last step
    if (currentStep === 4) {
        endBtn.disabled = true;
        prevNext[1].disabled = true;
    } else if (currentStep === 0) {
        //if we are at the first step  
        startBtn.disabled = true;
        prevNext[0].disabled = true;
    } else {
        startBtn.disabled = false;
        prevNext[0].disabled = false;
        endBtn.disabled = false;
        prevNext[1].disabled = false;
    }
}

//Add event listeners to the number links 
numbers.forEach((number, numIndex) => {
    number.addEventListener("click", (e) => {
        e.preventDefault();
        //Set the current to the clicked number link
        currentStep = numIndex;

        //Remove the "active" class from the previously active number
        document.querySelector(".active").classList.remove('active');

        //Add the active class to the clicked link
        number.classList.add("active");
        updateBtn(); //update the button state
    })
});

//Add event listeners to the "Previous" and "Next" buttons

prevNext.forEach((button) => {
    button.addEventListener("click", (e) => {
        //Increment or decrement the current step based on the button
        currentStep += e.target.id === "next" ? 1 : -1;
        numbers.forEach((number, numIndex) => {
            //Toggle the "active" class on the number links based on the
            number.classList.toggle("active", numIndex === currentStep);
            updateBtn(); //update the button state
        });
    });
});


//Add event listener to the "start" button 
startBtn.addEventListener("click", () => {
    //Remove the "active" class from thr previously active number link
    document.querySelector(".active").classList.remove("active");
    //add the "active" class to rhe first number link
    numbers[0].classList.add("active");
    currentStep = 0;
    updateBtn();
    endBtn.disabled = false;
    prevNext[1].disabled = false;
});

//Add event listener to the "end" button 
endBtn.addEventListener("click", () => {
    //Remove the "active" class from thr previously active number link
    document.querySelector(".active").classList.remove("active");
    //add the "active" class to rhe last number link
    numbers[4].classList.add("active");
    currentStep = 4;
    updateBtn();
    startBtn.disabled = false;
    prevNext[0].disabled = false;
});
