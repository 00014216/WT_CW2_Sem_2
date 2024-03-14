var selectedRow = null;

// Show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className  = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

// Clear All Data
function clearFields(){
    document.querySelector("#eventName").value = "";
    document.querySelector("#datetimeName").value = "";
    document.querySelector("#emailNo").value = "";
}

// Add Data

document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault();

    // Get Form Values
    const eventName = document.querySelector("#eventName").value
    const datetimeName = document.querySelector("#datetimeName").value
    const emailNo = document.querySelector("#emailNo").value

    // Validate
    if(eventName == "" || datetimeName == "" || emailNo == ""){
        showAlert("Please fill in all fields", "danger");
    }
    else{
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${eventName}</td>
                <td>${datetimeName}</td>
                <td>${emailNo}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Event Info Added", "success");
        }
        else{
            selectedRow.children[0].textContent = eventName;
            selectedRow.children[1].textContent = datetimeName;
            selectedRow.children[2].textContent = emailNo;
            selectedRow = null;
            showAlert("Event Info Edited", "Info");
        }

        clearFields();
    }
});

// Edit Data

document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#eventName").value = selectedRow.children[0].textContent;
        document.querySelector("#datetimeName").value = selectedRow.children[1].textContent;
        document.querySelector("#emailNo").value = selectedRow.children[2].textContent;
    }
});


// Delete Data

document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Event Info Deleted", "danger");
    }
});
