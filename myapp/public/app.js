const file= document.getElementById("file");
const db = firebase.firestore();
const usersRef = db.collection("Users");
const updateBtn = document.getElementById("updateBtn");

readFile = () => {
    let reader = new FileReader();
    reader.onload = () => {
        console.log(reader);
        const info =  parseCSV(reader.result);
        const users = [];
        for(let i=1;i<info.length;i++){
            let user = {};
            for(let j=0;j<info[i].length;j++){
                if(info[0][j].toLowerCase()=="password"){
                    console.table(info[0][j],info[i][j]);
                    user[info[0][j]] = encrypt(info[i][j]);
                }
                else user[info[0][j]] = info[i][j];
            }
            users.push(user);
        }
        updateBtn.onclick = () => {
            users.forEach( async user=>{
                await usersRef.add(user);
            })
            console.log("Successfully Uploaded in Database");
        }  
    };
    reader.readAsBinaryString(file.files[0]);
}
file.addEventListener('change', readFile);

function parseCSV(str) {
    var arr = [];
    var quote = false;  
    for (var row = 0, col = 0, c = 0; c < str.length; c++) {
        var cc = str[c], nc = str[c+1];        
        arr[row] = arr[row] || [];             
        arr[row][col] = arr[row][col] || ''; 
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }
        if (cc == '"') { quote = !quote; continue; }
        if (cc == ',' && !quote) { ++col; continue; }
        if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }
        if (cc == '\r' && !quote) { ++row; col = 0; continue; }
        arr[row][col] += cc;
    }
    return arr;
}


function encrypt(password){
    var encrypted = CryptoJS. AES. encrypt(password, 'secret key 123'). toString();
    console.log(encrypted);
    return encrypted;
}