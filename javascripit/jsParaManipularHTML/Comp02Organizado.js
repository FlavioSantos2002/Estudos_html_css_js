class CompOrganizado extends HTMLElement{

    constructor() {
        super()

        const shadow = this.attachShadow({mode: 'open'})

        shadow.appendChild(this.bild())
        shadow.appendChild(this.style())

    }

    bild(){

        const componentRoot = document.createElement('div')
        componentRoot.setAttribute('class', 'card')
        
        const cardLeft = document.createElement('div')
        cardLeft.setAttribute('class', 'card__left')


        const autor = document.createElement('span')
        autor.textContent = 'by ' + (this.getAttribute('autor') || 'anonymous')


        const linkTitle = document.createElement('a')
        linkTitle.href = this.getAttribute('link')
        linkTitle.textContent = this.getAttribute('title')


        const conteudo = document.createElement('p')
        conteudo.textContent = this.getAttribute('content')



        cardLeft.appendChild(autor)
        cardLeft.appendChild(linkTitle)
        cardLeft.appendChild(conteudo)

        const cardRight = document.createElement('div')
        cardRight.setAttribute('class', 'card__Right')

        const imagem = document.createElement('img')
        imagem.src = this.getAttribute('caminho_imagem') || "https://cc-prod.scene7.com/is/image/CCProdAuthor/FF-SEO-text-to-image-marquee-1x?$pjpeg$&jpegSize=100&wid=600"
        cardRight.appendChild(imagem)


        

        componentRoot.appendChild(cardLeft)
        componentRoot.appendChild(cardRight)

        return componentRoot

    }

    style(){
        const style = document.createElement('style')

        style.textContent = `

        div.card__Right img{
            width: 300px;
            height: 200px
        }

        .card {
            margin: auto;
            width: 80%;
            box-shadow: 9px 9px 27px 0px rgba(0, 0, 0, 0.75);
            -webkit-box-shadow: 9px 9px 27px 0px rgba(0, 0, 0, 0.75);
            -moz-box-shadow: 9px 9px 27px 0px rgba(0, 0, 0, 0.75);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          
          .card__left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 10px;
          }
          
          .card__left > span {
            font-weight: 400;
          }
          
          .card__left > a {
            margin-top: 15px;
            font-size: 25px;
            color: black;
            text-decoration: none;
            font-weight: bold;
          }
          
          .card__left > p {
            color: rgb(70, 70, 70);
          }
        `



        return style

    }
}

customElements.define('comp-02', CompOrganizado)