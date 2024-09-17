const screenSection = document.getElementById("screen")
const calcButtonsSection = document.getElementById("calc-buttons")
let preValue = 0
let operation = ""
let equalState = false
let lastAction = null

calcButtonsSection.addEventListener("click", event => {
	if (event.target.tagName !== "BUTTON") return

	// Number
	if ("0123456789".includes(event.target.innerText)) {
		if (equalState) {
			preValue = screenSection.innerText = 0
			resetOperation()
		}
		equalState = false
		screenSection.innerText = +(screenSection.innerText + event.target.innerText)
		lastAction = "number"
	}
	// Backspace
	else if (event.target.innerText === "←") {
		if (equalState) return
		screenSection.innerText = screenSection.innerText.slice(0, -1)
		if (!screenSection.innerText) screenSection.innerText = "0"
		lastAction = "backspace"
	}
	// Operation
	else if ("+−×÷".includes(event.target.innerText)) {
		if (lastAction !== "operation") {
			preValue = +screenSection.innerText
			if (operation) evaluate()
		}
		screenSection.innerText = "0"
		resetOperation()
		selectOperation(event.target)
		equalState = false
		lastAction = "operation"
	}
	// Equals
	else if (event.target.innerText === "=") {
		evaluate()
		lastAction = "equal"
	}
	// Clear
	else if (event.target.innerText === "C") {
		preValue = screenSection.innerText = 0
		resetOperation()
		equalState = false
		lastAction = "clear"
	}
})

/**
 * Reset the operation
 */
function resetOperation() {
	document.querySelector(".selected-operation")?.classList.remove("selected-operation")
	operation = ""
}

/**
 * Select an operation
 * @param {HTMLElement} element The element to select
 */
function selectOperation(element) {
	operation = element.innerText
	element.classList.add("selected-operation")
}

/**
 * Evaluate the calculation
 */
function evaluate() {
	let result
	switch (operation) {
		case "+":
			result = preValue + +screenSection.innerText
			break
		case "−":
			result = equalState ? +screenSection.innerText - preValue : preValue - +screenSection.innerText
			break
		case "×":
			result = preValue * +screenSection.innerText
			break
		case "÷":
			result = equalState ? +screenSection.innerText / preValue : preValue / +screenSection.innerText
			break
		default:
			return
	}
	if (!equalState) preValue = +screenSection.innerText
	screenSection.innerText = result
	document.querySelector(".selected-operation")?.classList.remove("selected-operation")
	equalState = true
}