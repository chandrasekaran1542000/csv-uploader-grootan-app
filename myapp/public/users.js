const db = firebase.firestore();
const userRef = db.collection("Users");
const usersContainer = document.querySelector(".users-container");
const showBtn = document.getElementById("showBtn");

showBtn.onclick = () => {
    userRef.onSnapshot(querySnapshot => {
        const users = querySnapshot.docs.map(doc=>{
            const keys = Object.keys(doc.data());

            let template = `<div class="card bg-dark text-white p-3">`;

            keys.forEach(key=>{
                template += `<p>${key} : ${doc.data()[key]}</p>`;
            })

            template += `</div>`;
 
            return template;
        });

        if(users.length){ 
            console.log(users)
              usersContainer.innerHTML = users;
        }
        else{
            usersContainer.innerHTML = "<h2>No Record Found!</h2>";
        }
    })
}