const email = document.getElementById("email");
const password = document.getElementById("password");
const username = document.getElementById("username");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const male = document.getElementById("male");
const female = document.getElementById("female");
const nonBinary = document.getElementById("nonBinary");
const other = document.getElementById("other");
const notInformed = document.getElementById("notInformed");

const apiSignup = "http://localhost:3000/api/v1/signup";

const gender =
    male.value ||
    female.value ||
    nonBinary.value ||
    other.value ||
    notInformed.value;

const submitButton = document.querySelector("#signup button");

submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const date_of_birth = new Date(
        `${day.value}, ${month.value}, ${year.value}`
    );
    const user = new User(
        email.value,
        password.value,
        username.value,
        date_of_birth,
        gender
    );

    // console.log(date_of_birth);
    const res = await user.signUp(apiSignup);
    if (res.status < 299) {
        const { msg } = await res.json();
        alert(`${msg}`);
        window.location.href = "../index.html";
    } else {
        const { error } = await res.json();
        alert(`${error}`);
    }
});
