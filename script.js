// ======================================
// Intel Sustainability Summit Check-In
// ======================================

// Attendance Goal
const attendanceGoal = 50;

// Counters
let totalAttendees = Number(localStorage.getItem("totalAttendees")) || 0;
let waterCount = Number(localStorage.getItem("waterCount")) || 0;
let zeroCount = Number(localStorage.getItem("zeroCount")) || 0;
let powerCount = Number(localStorage.getItem("powerCount")) || 0;

// Load attendee list from Local Storage
let attendeeListData = JSON.parse(localStorage.getItem("attendeeList")) || [];

// ======================================
// Get HTML Elements
// ======================================

const form = document.getElementById("checkInForm");

const greeting = document.getElementById("greeting");

const attendeeCounter = document.getElementById("attendeeCount");

const waterDisplay = document.getElementById("waterCount");
const zeroDisplay = document.getElementById("zeroCount");
const powerDisplay = document.getElementById("powerCount");

const progressBar = document.getElementById("progressBar");

// ======================================
// Create Attendee List (LevelUp)
// ======================================

// Creates the list automatically if it doesn't exist in HTML
const attendeeSection = document.createElement("div");
attendeeSection.innerHTML = `
    <h3>Attendee List</h3>
    <ul id="attendeeList"></ul>
`;

document.querySelector(".container").appendChild(attendeeSection);

const attendeeList = document.getElementById("attendeeList");

// ======================================
// Load Saved Data
// ======================================

updateDisplay();

attendeeListData.forEach(person => {
    const item = document.createElement("li");
    item.textContent = `${person.name} - ${person.team}`;
    attendeeList.appendChild(item);
});

// ======================================
// Listen for Form Submission
// ======================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get Input Values
    const attendeeName =
        document.getElementById("attendeeName").value.trim();

    const selectedTeam =
        document.getElementById("teamSelect").value;

    if (attendeeName === "") {
        alert("Please enter your name.");
        return;
    }

    // Increase Total Attendance
    totalAttendees++;

    // Determine Team
    let teamName = "";

    if (selectedTeam === "water") {

        waterCount++;
        teamName = "Team Water Wise";

    } else if (selectedTeam === "zero") {

        zeroCount++;
        teamName = "Team Net Zero";

    } else if (selectedTeam === "power") {

        powerCount++;
        teamName = "Team Renewables";

    }

    // Greeting Message
    greeting.textContent =
        `🎉 Welcome, ${attendeeName} from ${teamName}!`;

    // Add to Attendee List
    attendeeListData.push({
        name: attendeeName,
        team: teamName
    });

    const item = document.createElement("li");
    item.textContent = `${attendeeName} - ${teamName}`;
    attendeeList.appendChild(item);

    // Update Page
    updateDisplay();

    // Save Progress
    saveData();

    // Celebration
    if (totalAttendees >= attendanceGoal) {

        let winner = "";

        if (waterCount >= zeroCount && waterCount >= powerCount) {

            winner = "Team Water Wise";

        } else if (zeroCount >= waterCount && zeroCount >= powerCount) {

            winner = "Team Net Zero";

        } else {

            winner = "Team Renewables";

        }

        alert(
            `🎉 Congratulations!\n\nAttendance Goal Reached!\n\nWinning Team: ${winner}`
        );
    }

    // Reset Form
    form.reset();

});

// ======================================
// Update Display
// ======================================

function updateDisplay() {

    // Attendance Counter
    attendeeCounter.textContent = totalAttendees;

    // Team Counters
    waterDisplay.textContent = waterCount;
    zeroDisplay.textContent = zeroCount;
    powerDisplay.textContent = powerCount;

    // Progress Bar
    const percent =
        (totalAttendees / attendanceGoal) * 100;

    progressBar.style.width = percent + "%";
}

// ======================================
// Save Data
// ======================================

function saveData() {

    localStorage.setItem(
        "totalAttendees",
        totalAttendees
    );

    localStorage.setItem(
        "waterCount",
        waterCount
    );

    localStorage.setItem(
        "zeroCount",
        zeroCount
    );

    localStorage.setItem(
        "powerCount",
        powerCount
    );

    localStorage.setItem(
        "attendeeList",
        JSON.stringify(attendeeListData)
    );

}