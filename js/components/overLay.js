
const overlayBox= (title, method) => {
    return ( 
        `
            <div class="over-lay-box">
                <div class="over-lay-message">

                    <h3>
                        Are you sure to ${method === 'update' ? "update" : "delete"} 
                        <span class="title-span">${title}</span>?
                    </h3>

                    ${method === 'update' ? `<input class="update-title" type="text" value="${title}">` : ""}

                    <div>
                        <button class="yes ${method}" role="button">Yes</button>
                        <button class="no" role="button">No</button>
                    </div>     
                </div>
            </div>
                
        `
    )
}

const overlayBox1= (title, method) => {
    const overLayBox= document.createElement('div');
    overLayBox.classList.add('over-lay-box');

    const message= document.createElement('div');
    message.classList.add("over-lay-message");

    const h3= document.createElement('h3');
    h3.innerHTML= `Are you sure to ${method === 'update' ? "update" : "delete"} <span class="title-span"}>${title}</span>?`

    const updateInput= document.createElement('input');
    updateInput.classList.add('update-title');
    updateInput.value= title;

    const confirmDiv= document.createElement('div');
    confirmDiv.innerHTML= `<button class="yes ${method}">Yes</button><button class="no">No</button>`

    message.appendChild(h3);
    if(method === 'update') message.appendChild(updateInput);
    message.appendChild(confirmDiv);

    overLayBox.appendChild(message);

    return overLayBox;
}

// ------------------Small Toast Message---------------------
function showToast(message, type= 'info') {
  const toast = document.getElementById('toast');

  toast.textContent = message;
  toast.className= "toast";
  toast.classList.add(type);
  toast.classList.add("show");
  toast.role= "alert";

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000); 
}

export { overlayBox, overlayBox1, showToast };

