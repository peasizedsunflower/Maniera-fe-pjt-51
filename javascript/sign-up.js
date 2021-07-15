// decarling gobal varible

const togglePassword = document.querySelector("#togglePassword");
const toggleConfirmPassword = document.querySelector("#toggle-confirm-password");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const myForm = document.querySelector("#myform");

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const passwordError = document.querySelector(".password-error");
const confirmPasswordError = document.querySelector(".confirm-password-error");
const preloader = document.querySelector(".preloader");

//  toggling the password visilibilty

togglePassword.addEventListener("click", function (e) {
	// toggle the type attribute
	const type = password.getAttribute("type") === "password" ? "text" : "password";
	password.setAttribute("type", type);
	// toggle the eye / eye slash icon
	this.classList.toggle("bi-eye");
});

toggleConfirmPassword.addEventListener("click", function (e) {
	// toggle the type attribute
	const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
	confirmPassword.setAttribute("type", type);
	// toggle the eye / eye slash icon
	this.classList.toggle("bi-eye");
});

// sending form data with fetch api
myForm.addEventListener("submit", function (e) {
	e.preventDefault();
	preloader.style.display = "block";

	const user = {
		firstName: firstName.value,
		lastName: lastName.value,
		email: email.value,
		password: password.value,
		confirmPassword: confirmPassword.value,
	};

	console.log(user);

	const CheckPassword = (inputtxt) => {
		var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
		if (inputtxt.value.match(decimal)) {
			return true;
		} else {
			return false;
		}
	};

	if (!CheckPassword(password)) {
		preloader.style.display = "none";
		passwordError.classList.add("alert", "alert-danger");
		passwordError.innerHTML =
			"Password should contain at least an uppercase letter, a lower case letter, a digit, a symbol and not less than 8 characters in total";

		setTimeout(() => {
			passwordError.classList.remove("alert", "alert-danger");
			passwordError.innerHTML = "";
		}, 10000);
	} else if (password.value !== confirmPassword.value) {
		preloader.style.display = "none";
		confirmPasswordError.classList.add("alert", "alert-danger");
		confirmPasswordError.innerHTML = "Password does not match";

		setTimeout(() => {
			confirmPasswordError.classList.remove("alert", "alert-danger");
			confirmPasswordError.innerHTML = "";
		}, 10000);
	} else {
		fetch("https://maniera-dev.herokuapp.com/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				window.location = "/html/sign-in.html";
				preloader.style.display = "none";
			})
			.catch((error) => {
				preloader.style.display = "none";
				console.error(error);
			});
	}
});
