const button = document.querySelector("button")
button.onclick = (event) => {
    event.preventDefault()
    signUpEagle()
}

async function signUpEagle() {
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value


    if(email === "" || password === "") {
        return
    }
    else {
        document.getElementById('message').textContent = 'Preencha todas as informações';
    }

    const user = {
        email,
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
        document.getElementById('formDoador').reset();
   }
   
    window.location.href = "../../index.html"
}