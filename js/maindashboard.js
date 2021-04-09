//var available=['1334267','1334271','1334274','1334277'];
var available = [];
var inused = [];
var room = [];
var AvailableSize = 0,inUseSize = 0,index1 = 0,index2 = 0,index3 = 0;

//find size of keys collection
    fs.collection("keys").get().then(function(querySnapshot) {      
    AvailableSize=querySnapshot.docs.length; 
    console.log(AvailableSize);
});

//find size of Inuse collection
    fs.collection("inuse").get().then(function(querySnapshot) {      
    inUseSize=querySnapshot.docs.length; 
    console.log(inUseSize);
});

//store in available array
fs.collection("keys").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                available[index1++] = doc.data().ChannelKey;
                console.log(doc.data().ChannelKey);
                });
            });

//store in inuse array
fs.collection("inuse").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                inused[index2++] = doc.data().ChannelKey;
                console.log(doc.data().ChannelKey);
                });
            });

//store in rooms array
fs.collection("rooms").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                room[index3++] = doc.data().RoomNumber;
                console.log(doc.data().RoomNumber);
                });
            });

const displayAvailable=()=>{
    const displaybox=document.querySelector(".available")
    document.getElementById('available').focus()
    displaybox.style.display="block"
    const inuse=document.querySelector(".inuse")
    inuse.style.display="none"
    var temp='';
    if(AvailableSize==0){
        
        inuse.innerHTML="  <b><font color='red'>There is no available devices !!!</font></b>"
    }
    for(var i=0;i<AvailableSize;i++){
	temp=temp+'<b>'+available[i]+'</b>'+' <input type="number" name="field'+i+'"placeholder="Enter Room No" required>  <button onclick="removeAvailable('+i+')">Assign</button><br>';
    }
    displaybox.innerHTML = temp;
}

const removeAvailable=(i)=>{
    inused.push(available[i])

//add in Inuse collections
    fs.collection("inuse").add({
    ChannelKey: available[i],
    RoomNumber: document.getElementsByName('field'+i)[0].value
});

    //remove from availableKeys collections
    let collectionRef1 = fs.collection("keys");
    collectionRef1.where("ChannelKey", "==", available[i])
.get()
.then(querySnapshot => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  });
})
.catch(function(error) {
  console.log("Error getting documents: ", error);
});
    
    available.splice(i,1);

    room.push(document.getElementsByName('field'+i)[0].value)
    //add in rooms collections
    fs.collection("rooms").add({
    RoomNumber: document.getElementsByName('field'+i)[0].value
});
    AvailableSize--;
    inUseSize++;
    displayAvailable();
}

const displayInuse=()=>{
    const displaybox=document.querySelector(".available")
    displaybox.style.display="none"
    const inuse=document.querySelector(".inuse")
    inuse.style.display="block"
    var temp='';
    for(var i=0;i<inUseSize;i++){
	temp=temp+'<a href="leveldashboard.html?id='+inused[i]+'&bno='+room[i]+'"><b>'+inused[i]+'</b></a>'+'<a>Used in Room No: '+room[i]+'</a> <button onclick="removeInuse('+i+')">Remove</button><br>';
    }
    inuse.innerHTML = temp;
    if(inUseSize==0){
        
        inuse.innerHTML="  <b><font color='red'>There is no device in use !!!</font></b>"
    }
}
const removeInuse=(i)=>{

    //add in availableKeys collections
    fs.collection("keys").add({
    ChannelKey: inused[i]
});
    available.push(inused[i])

//remove from Inuse collections
 let collectionRef = fs.collection("inuse");
collectionRef.where("RoomNumber", "==", room[i])
.get()
.then(querySnapshot => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  });
})
.catch(function(error) {
  console.log("Error getting documents: ", error);
});

    inused.splice(i,1);

    //remove from rooms collections
 let collectionRef2 = fs.collection("rooms");
collectionRef2.where("RoomNumber", "==", room[i])
.get()
.then(querySnapshot => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  });
})
.catch(function(error) {
  console.log("Error getting documents: ", error);
});
    room.splice(i,1);
    AvailableSize++;
    inUseSize--;
    displayInuse();
}
displayAvailable();
