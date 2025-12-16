const submitbtn = document.querySelector('#submitbtn');
const nameInput = document.querySelector('#empname');
const msg = document.querySelector('#statusmsg');

function processUpdate(){
    const name = nameInput.value;
    const department = submitbtn.dataset.dept;

    if(name === ""){
        msg.innerText = "Error : Name Cannot Be Empty";
        msg.style.color = "red";
    }
    else{
        msg.innerText = "Success ";
        msg.style.color = "green";

        console.log("User:",name);
    }
}
submitbtn.addEventListener('click',processUpdate);