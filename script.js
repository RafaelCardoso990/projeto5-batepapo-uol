let userName = null;


function entrarNaSala(){
    const nome = document.querySelector('.usuario').value;
    userName = {name: nome}
    
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', userName);
    promessa.then(tratarSucesso);    
    promessa.catch(tratarErro);   
}

function tratarSucesso(resposta){
    entrou();
    mostrarMensagemChat();
    setInterval(estaOn, 5000)
}

function tratarErro(erro){
    alert('Nome indisponível, digite outro nome !')
}

function estaOn(){
    const continuaOn = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', userName);

}


//chat

function mostrarMensagemChat(){
    setInterval(carregarMensagensChat, 3000);   
    setInterval(ultimaMensagem, 3000); 
}

function carregarMensagensChat(){
    let promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages')
    promessa.then(processarRespostaChat);    
}

function processarRespostaChat(resposta){
    mostrarMensagensNoChat(resposta.data);
    
}

// function pegarUltimaMensagem(respostam){
    
// }

function mostrarMensagensNoChat(mensagensChat){
    const mensagens = document.querySelector('.principal')
    mensagens.innerHTML = ""
    for(let i = 0; i < mensagensChat.length; i++){
        if(mensagensChat[i].type === 'status'){
        mensagens.innerHTML += `<div class="entrou mensagem" data-identifier="message">
                                    <div class="horario">
                                        <p>(${mensagensChat[i].time})</p>
                                    </div>
                                    <div class="nome">
                                        <p>${mensagensChat[i].from}</p>
                                    </div>  
                                    <div class="entrada">
                                        <p>entra na sala...</p>
                                    </div>
                                </div>`
        }else if(mensagensChat[i].type === 'message'){
        mensagens.innerHTML += `<div class="mensagem-publica mensagem" data-identifier="message">
                                    <div class="horario">
                                        <p>(${mensagensChat[i].time})</p>
                                    </div>
                                    <div class="nome">
                                        <p>${mensagensChat[i].from}</p>
                                    </div>  
                                    <div class="mensagem-direta-publica">
                                        <p>para</p>
                                    </div>
                                    <div class="nome2">
                                        <p>${mensagensChat[i].to}:</p>    
                                    </div>
                                    <div class="mensagem-direta-publica2"> 
                                        <p>${mensagensChat[i].text}</p>
                                    </div>
                                </div>  `
        }else if(mensagensChat[i].type === 'private_message'){
            mensagens.innerHTML += `<div class="mensagem-reservada mensagem" data-identifier="message">
                                        <div class="horario">
                                            <p>(${mensagensChat[i].time})</p>
                                        </div>
                                        <div class="nome">
                                            <p>${mensagensChat[i].from}</p>
                                        </div>  
                                        <div class="mensagem-direta-publica">
                                            <p>para</p>
                                        </div>
                                        <div class="nome2">
                                            <p>${mensagensChat[i].to}:</p>    
                                        </div>
                                        <div class="mensagem-direta-publica2"> 
                                            <p>${mensagensChat[i].text}</p>
                                        </div>
                                    </div>  `
                                   
        }
        ultimaMensagem(); 
    }
}

function ultimaMensagem(){
   const ultima = document.querySelector('.principal .mensagem:last-child');   
   ultima.scrollIntoView();
}


// enviar mensagens 
let mensagensEnviar = {};

function enviarMensagens(){
    formarObjeto();
    postObjeto();
}    

function formarObjeto(){
    mensagensEnviar.from = userName.name
    mensagensEnviar.to = "Todos"
    mensagensEnviar.text = document.querySelector('.texto input').value
    mensagensEnviar.type = "message"
    console.log(mensagensEnviar)
}

function postObjeto(){
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', mensagensEnviar);  
    promessa.then(carregarMensagensChat);   
    promessa.catch(erroChat);
}

function erroChat(){
    window.reload.reload(forcedReload)
}


//tela inicial

function entrou (){
    abrirChat();
    fecharInicial();
   
}

function abrirChat(){
    const navBar = document.querySelector('main');
    navBar.classList.remove('hidden');
}

function fecharInicial(){
    const navBar = document.querySelector('.pagina-inicial');
    navBar.classList.add('hidden');
}



// side bar

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
