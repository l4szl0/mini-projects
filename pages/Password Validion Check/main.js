const passwordInpput = document.querySelector('.pass-field input');
const eyeIcon = document.querySelector('.pass-field i');
const requirementList = document.querySelectorAll('.requirement-list li');

// An array of password requirements with correspponding
// regular expressions and index of the requirement lis item
const requirements = [
    { regex: /.{8}/, index: 0 }, // minimum of 8 characters
    { regex: /[0-9]/, index: 1 },   //at least one number
    { regex: /[a-z]/, index: 2 },   //at least one lowecase letter
    { regex: /[^A-Za-z0-9]/, index: 3 },    //at least one sppacial character
    { regex: /[A-Z]/, index: 4 },   //at least one uppercase letter
]
passwordInpput.addEventListener("keyup", (e) => {
    requirements.forEach(item => {

        //check if the password matches the requirement regex
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];


        //uppdate class and icon of requirement item if requirement mached or not
        if(isValid) {
            requirementItem.firstElementChild.className = 'fa-solid fa-check';
            requirementItem.classList.add('valid');
        } else {
            requirementItem.firstElementChild.className = 'fa-solid fa-circle';
            requirementItem.classList.remove('valid');
        }
    })
});

eyeIcon.addEventListener('click', () => {

    //Toggle the ppassword input type between "password" and "text"
    passwordInpput.type = passwordInpput.type === "password" ? "text" : "password";

    //Uppdate the eye icon class based on the ppassword input type
    eyeIcon.className = `fa-solid fa-eye${passwordInpput.type === "password" ? "" : "-slash"}`;
});