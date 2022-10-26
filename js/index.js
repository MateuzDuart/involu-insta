var preco = document.querySelector('.preco')
var servico = document.querySelector('select')
var quantidade = document.querySelector('#quantidade')
var perfil = document.querySelector('#Perfil')
var btnPerfil = document.querySelector('.btn.perfil')
var mais = document.querySelector('.mais')
var menos = document.querySelector('.menos')
var painel = document.querySelector('.painel')
var totPreco = 0
var totAdded = 0

function checarPerfil() {
    let perfis = document.querySelectorAll('#Perfil')
    let cheios = 0
    perfis.forEach((e) => {
        if (e.value != '') {
            cheios++
        }
    })
    if (cheios == perfis.length) {
        return true
    } else {
        return false
    }
}

function addLink() {
    if (quantidade.value != '' && checarPerfil()) {
        let valorQuanti = quantidade.value
        let valorPerfil = perfil.value
        let valorPerfis = document.querySelectorAll('#Perfil')
        if (totPreco >= 5) {
            if (servico.value == 'Seguidores') {
                document.querySelector('.botoes .btn').href = `https://api.whatsapp.com/send?phone=5581986437864&text=ol%C3%A1%20eu%20gostaria%20de%20${valorQuanti}%20seguidores%20neste%20pefil%20${valorPerfil}`
            } else if (servico.value == 'Curtidas' || servico.value == 'Curtidas no reels') {
                if (valorPerfis.length <= 1) {
                    document.querySelector('.botoes .btn').href = `https://api.whatsapp.com/send?phone=5581986437864&text=ol%C3%A1%20eu%20gostaria%20de%20${valorQuanti}%20likes%20nesta%20foto%20${valorPerfil}`
                } else {
                    let strPerfis = ''
                    valorPerfis.forEach((e) => {
                        strPerfis += `${e.value}, `
                    })
                    document.querySelector('.botoes .btn').href = `https://api.whatsapp.com/send?phone=5581986437864&text=ol%C3%A1%20eu%20gostaria%20de%20${valorQuanti}%20likes%20dividido%20nestas%20publicação%20${strPerfis}`
                }
            } else if (servico.value == 'Vizualização no reels') {
                if (valorPerfis.length <= 1) {
                    document.querySelector('.botoes .btn').href = `https://api.whatsapp.com/send?phone=5581986437864&text=ol%C3%A1%20eu%20gostaria%20de%20${valorQuanti}%20likes%20nesta%20publicação%20${valorPerfil}`
                } else {
                    let strPerfis = ''
                    valorPerfis.forEach((e) => {
                        strPerfis += `${e.value}, `
                        console.log(e.value)
                    })
                    document.querySelector('.botoes .btn').href = `https://api.whatsapp.com/send?phone=5581986437864&text=ol%C3%A1%20eu%20gostaria%20de%20${valorQuanti}%20likes%20dividido%20nestas%20publicação%20\n${strPerfis}`
                }
    
            } else if (servico.value.indexOf('impressões') != -1) {
                document.querySelector('.botoes .btn').href = `https://api.whatsapp.com/send?phone=5581986437864&text=ol%C3%A1%20eu%20gostaria%20de%20${valorQuanti}%20novas%20visitas%20no%20meu%20perfil%20${valorPerfil}`
            }
        }
    
        
    } else {
        document.querySelectorAll('.botoes .btn').forEach((e) => {
            e.removeAttribute('href')
        })
    }

}

document.querySelector('.botoes .btn').onclick = function () {
    if (totPreco <= 4.999) {
        alert('o valor mínimo é de 5 Reais')
    }
}
servico.onchange = function () {
    this.parentElement.querySelector('.desc p').innerHTML = `- ${this.value} de alta qualidade<br>- Perfis Brasileiros<br>- chegam super rápidos <br>- Perfis reais`
    if (this.value == 'Seguidores' || this.value.indexOf('visitas') != -1) {
        if (this.value.indexOf('visitas') == -1) {
            for (let i = 1; i <= totAdded; i++) {
                document.querySelector('.entradas').removeChild(document.querySelector('.entradas').lastChild)
            }
            totAdded = 0
        }
        document.querySelector('.nome.perfil').innerHTML = '@Usuario'
        btnPerfil.querySelector('span').innerHTML = 'Checar Perfil'
        mais.style.display = 'none'
        menos.style.display = 'none'
    } else if (this.value.indexOf('reels') != -1) {
        document.querySelector('.nome.perfil').innerHTML = 'Link reels'
        btnPerfil.querySelector('span').innerHTML = 'Checar reels'
        mais.style.display = 'block'
        menos.style.display = 'block'
    } else {
        document.querySelector('.nome.perfil').innerHTML = 'Link imagen'
        btnPerfil.querySelector('span').innerHTML = 'Checar Imagen'
        menos.style.display = 'block'
        mais.style.display = 'block'
    }
    quantidade.value = ''
    preco.innerHTML = '0,00R$'
}

quantidade.onchange = function () {
    let total = 0
    addLink()
    if (servico.value == 'Seguidores') {
        total = this.value * (10 / 1000)
    } else {
        total = this.value * (5 / 1000)
    }
    totPreco = total
    if (String(total)[4] != undefined && String(total)[4] != 0) {
        total = String(total.toFixed(3))
    } else {
        total = String(total.toFixed(2))
    }
    preco.innerHTML = `<span class="real">${total.slice(0, 2)}</span>${total.slice(2)}R$`.replace('.', ',')
}

function perfilVerificador() {
    addLink()

    if (servico.value == 'Seguidores' || this.value.indexOf('visitas') != -1) {
        btnPerfil.href = `https://instagram.com/${this.value}`
    } else {
        btnPerfil.href = this.value
    }

}

perfil.onchange = perfilVerificador

mais.onclick = function () {
    addLink()
    totAdded++
    document.querySelector('.entradas').appendChild(document.querySelectorAll('.entrada')[1].cloneNode(true))
    document.querySelectorAll('#Perfil').forEach((e) => {
        e.onchange = perfilVerificador
    })
}

menos.onclick = function () {
    addLink()
    if (totAdded > 0) {
        totAdded--
        document.querySelector('.entradas').lastChild.remove()
    }

}

let setas = document.querySelectorAll('.setaVerMais')
setas.forEach((e) => {
    e.parentElement.onclick = function () {
        e.classList.toggle('ativado')
        e.parentElement.querySelector('.resposta').classList.toggle('ativado')
    }
})

document.querySelector('.hamburger').onclick = function () {
    this.classList.toggle('ativado')
    document.querySelector('ul').classList.toggle('ativado')
}



function popUpPerfil() {
    let popUp = document.querySelector('.perfil-cta')
    let link = this.getAttribute('href')
    popUp.classList.toggle('ativo')
    popUp.querySelector('a').href = link
    popUp.querySelector('input').value = ''
    popUp.querySelector('.btn').setAttribute('tipo', `${this.getAttribute('tipo')}`)
    document.querySelector('.fechador').classList.toggle('ativo')
}

function popUpPubli() {
    let popUp = document.querySelector('.publicacao')
    let link = this.getAttribute('href')
    popUp.classList.toggle('ativo')
    popUp.querySelector('a').href = link
    popUp.querySelector('input').value = ''
    popUp.querySelector('.btn').setAttribute('tipo', `${this.getAttribute('tipo')}`)

    document.querySelector('.fechador').classList.toggle('ativo')
}

document.querySelector('.publicacao .fechar').onclick = popUpPubli

document.querySelector('.perfil-cta .fechar').onclick = popUpPerfil

document.querySelectorAll('.carta.publi .btn').forEach((e) => {
    e.onclick = popUpPubli
})

document.querySelectorAll('.carta.perf .btn').forEach((e) => {
    e.onclick = popUpPerfil
})

document.querySelector('.fechador').onclick = function () {
    document.querySelector('.pop-cta.ativo').classList.toggle('ativo')
    document.querySelector('.fechador').classList.toggle('ativo')

}

document.querySelectorAll('.pop-cta input').forEach((e) => {
    e.onchange = function () {
        let botao = e.parentElement.parentElement.querySelector('.btn')
        if (e.name == 'user') {
            e.parentElement.parentElement.querySelector('.checar').href = `https://www.instagram.com/${e.value}`

            if (botao.getAttribute('tipo') == 'seguidores') {
                botao.href = `https://api.whatsapp.com/send?phone=5581986437864&text=ol%C3%A1%20eu%20gostaria%20de%201000%20seguidores%20no%20perfil%20${e.value}%20`
            } else {
                botao.href = `https://api.whatsapp.com/send?phone=5581986437864&text=ol%C3%A1%20eu%20gostaria%20de%201000%20visitas%20no%20perfil%20${e.value}%20`
            }
        } else {
            e.parentElement.parentElement.querySelector('.checar').href = e.value
            if (botao.getAttribute('tipo') == 'curtidas') {
                botao.href = `https://api.whatsapp.com/send?phone=5581986437864&text=ol%C3%A1%20eu%20gostaria%20de%201000%20curtidas%20nesta%20publicação%20${e.value}%20`
            } else if (botao.getAttribute('tipo') == 'views') {
                botao.href = `https://api.whatsapp.com/send?phone=5581986437864&text=ol%C3%A1%20eu%20gostaria%20de%201000%20vizualização%20nesta%20publicação%20${e.value}%20`
            }
        }

    }
})