// 1. SELECT ELEMENTS (Fixed IDs to match HTML)
const submitBtn = document.querySelector('#submitBtn'); 
const nameInput = document.querySelector('#empName');
const textarea = document.querySelector('#empUpdate');
const msg = document.querySelector('#statusMsg'); // HTML ID was statusMsg

// 2. DEFINE FUNCTION
function processUpdate() {
    const name = nameInput.value;
    const department = submitBtn.dataset.dept; // Data attribute access
    const updateText = textarea.value;

    // Reset message style first
    msg.innerText = "";
    msg.style.color = "black";

    // LOGIC: Check Name
    if (name === "") {
        msg.innerText = "Error: Name Cannot Be Empty";
        msg.style.color = "red";
    }

    // LOGIC: Check Update Text (Append error if name is also missing)
    if (updateText === "") {
        if (msg.innerText !== "") {
            msg.innerText += " | "; // Add separator if name error exists
        }
        msg.innerText += "Error: Update Cannot Be Empty";
        msg.style.color = "red";
    }

    // LOGIC: Success (Only if BOTH are filled)
    if (name !== "" && updateText !== "") {
        msg.innerText = "Success! Update sent to " + department + " team.";
        msg.style.color = "green";
        
        console.log("User:", name);
        console.log("Update:", updateText);
    }
}

// 3. ADD EVENT LISTENER
submitBtn.addEventListener('click', processUpdate);