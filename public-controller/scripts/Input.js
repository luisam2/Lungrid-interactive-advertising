//botones imput


let input = {
    bodyElement: document.querySelector('#Root'),

    getInput: function () {
        //Create a HTML element
        let div = document.createElement('div');
        div.className = "controls-container"
        //fill it up
        div.innerHTML = `
            <input id="input_name"></button>`;


        return div;

    },

    render: function () {
        this.bodyElement.appendChild(this.getInput());
    }

};

let inputEmail = {
    bodyElement: document.querySelector('#Root'),

    getInput: function () {

        let div = document.getElementsByClassName('controls-container');

        let input = document.createElement('input');
        input.id = 'input_email';
        
        div[0].appendChild(input)

        return div;

    },



};

let button = {
    bodyElement: document.querySelector('#Root'),

    getButton: function () {
        //Create a HTML element
        let div = document.getElementsByClassName('controls-container');
        //fill it up
        let btnCreate = document.createElement('button');
        btnCreate.innerHTML = 'Continuar'
        btnCreate.id = 'btn_putName';

        div[0].appendChild(btnCreate)
        let btn = document.querySelector('#btn_putName');

        btn.addEventListener('click', (e) => {
            console.log("Hello from button");
            this.onButton();
        });

        return div;

    },

 

};

let buttonStart = {
    bodyElement: document.querySelector('#Root'),

    getButton: function () {
        //Create a HTML element
        let div = document.getElementsByClassName('controls-container');
        //fill it up
        let btnCreate = document.createElement('button');
        btnCreate.innerHTML = 'Iniciar'
        btnCreate.id = 'btn_startName';

        div[0].appendChild(btnCreate)
        let btn = document.querySelector('#btn_startName');

        btn.addEventListener('click', (e) => {
            console.log("Hello from button");
            this.onButton();
        });

        return div;

    },

    noDisplay: function () {
        let btn = document.getElementById('btn_startName');
        btn.style.display = 'none';
    },

    yesDisplay : function () {
        let btn = document.getElementById('btn_starName');
        btn.style.display = 'block';
    }

 

};