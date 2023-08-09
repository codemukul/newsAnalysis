export function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Ramesh",
        "Codemukul",
        "mukul",
        "codemukul",
        "Mukul"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
}
