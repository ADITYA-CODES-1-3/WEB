function generateResult() {
    // 1. Get Inputs
    const rollNo = document.getElementById("rollNo").value;
    const name = document.getElementById("name").value;
    const marksInput = document.getElementById("marks").value;
    
    // 2. Simple Validation
    if (rollNo === "" || name === "" || marksInput === "") {
        alert("Please fill all details!");
        return;
    }

    const marks = Number(marksInput);

    // 3. Status Logic
    let statusText = "";
    let statusClass = "";

    if (marks >= 90) {
        statusText = "Outstanding 🌟";
        statusClass = "status-out";
    } else if (marks >= 40) {
        statusText = "Passed ✅";
        statusClass = "status-pass";
    } else {
        statusText = "Failed ❌";
        statusClass = "status-fail";
    }

    // 4. Update UI
    document.getElementById("displayName").innerText = name;
    document.getElementById("displayRoll").innerText = "Roll No: " + rollNo;
    document.getElementById("displayMarks").innerText = marks + " / 100";
    
    const statusEl = document.getElementById("displayStatus");
    statusEl.innerText = statusText;
    statusEl.className = "badge " + statusClass;

    // 5. Toggle Views
    document.getElementById("emptyState").style.display = "none";
    document.getElementById("resultCard").classList.remove("hidden");
}

// PDF FUNCTION
function downloadPDF() {
    // Triggers the browser's print dialog
    // The CSS @media print rule handles the hiding of other elements
    window.print();
}