function abrirNav(){
    const navBar = document.querySelector('.barra-lateral');
    navBar.classList.remove('hidden');
}

function fecharNav(){
    const navBar = document.querySelector('.barra-lateral');
    navBar.classList.add('hidden');
}

puxarDados();

function puxarDados (){
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants');
    promessa.then((reposta)=>{
        processarResposta(reposta);
    })
}

// console.log(resposta.data[0].name);
function processarResposta(resposta){
    mostrarDadosNaNav(resposta.data);
}

function mostrarDadosNaNav(nomes){
    const mensagens = document.querySelector('.todos')
    for(let i = 0; i < nomes.length; i++){ 
    mensagens.innerHTML += `<div class="box-todos">
                                <div class="icone-todos">
                                    <ion-icon name="person-circle-sharp"></ion-icon>
                                </div>
                                <div class="titulo-todos">
                                    <p>${nomes[i].name}</p>
                                </div>
                            </div>`
    }
}
