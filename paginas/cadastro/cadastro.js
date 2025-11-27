const button = document.querySelector("button")
button.onclick = (event) => {
    event.preventDefault()
    signUpEagle()
}

async function signUpEagle() {
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const age = document.querySelector("#age").value
    const password = document.querySelector("#password").value


    if(name === "" || email === "" || age === "" || password === "") {
        return
    }
     else {
        document.getElementById('message').textContent = 'Preencha todas as informações';
    }

    const user = {
        name, 
        email,
        age, 
        password
    }

    const response = await fetch("http://localhost:3333/cadastrar", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user })

    }).then(response => response.json())

   if (response.ok) {
        document.getElementById('message').textContent = 'Doador cadastrado!';
        document.getElementById('form').reset();
   }

    window.location.href = "../../index.html"
}