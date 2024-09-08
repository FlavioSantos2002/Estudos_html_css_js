class MeuComp01 extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });


        //o que vai ter no componente
        const compRoot = document.createElement('h1')
        compRoot.textContent = "Flavio"


        //estilo do Componente
        const style = document.createElement('style')

        style.textContent = `
        h1{
            color: blue;
            background-Color: red;
        }
        `

        shadow.appendChild(compRoot)
        shadow.appendChild(style)

        shadow.innerHTML += '<br>'


    }

}


customElements.define('comp-01', MeuComp01)
