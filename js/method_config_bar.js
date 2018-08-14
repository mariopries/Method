// let ConfigBarWidth = "500px";
let newArray = [];

Config = class {
    constructor() {
        document.getElementById("method_config_bar_script").remove();
    }

    static width() {
        return "400px";
    }
    Load(items) {
        if (!document.getElementById("config-bar")) {
            items = JSON.parse(items);
            let sideConfig = document.createElement("div");
            sideConfig.className = "sidebar-config";
            sideConfig.id = "config-bar";
            sideConfig.innerHTML = Config.Build(items);
            document.body.appendChild(sideConfig);
            // Config.EnableButton();

            for (let item of newArray) {

                Config.EnableConfirm(item);

            }

        }
    }

    static Build(Items) {
        let rawHTML;

        rawHTML =   `<div>
                        <div class="sidebar-container-method">
                            <ul class="method-list">`
        for (let item of Items) {

            item.type = Config.FindType(item)
            rawHTML += `<li>
                            <a class="method-sidebar-title" id="parm${item.id+item.baseType}">
                                <i class="${item.icon}"></i>
                                <span>${item.name}</span>
                                <span class="caret pull-right"></span>
                            </a>
                            <div class="col-xs-12 well method-sidebar-content">
                                <div class="well col-xs-10 col-xs-offset-1">
                                    <span>${item.description}
                                    </span>
                                </div>
                                <br>
                                <div class="col-xs-offset-1 col-xs-10">
                                    ${item.type}
                                    <div class="col-xs-7">
                                        <button class="btn btn-success pull-right" id="button${item.id+item.baseType}">Confirmar</button>
                                    </div>
                                </div>
                            </div>
                        </li>`

                newArray = Config.StoreIds(newArray,item);

        }

            `</ul>
        </div>
    </div>`;

        return rawHTML;
    }


    static FindType(item) {

        if (item.baseType === 'SmallInput') {
            return `<div class="col-xs-5 pull-left">
                        <input placeholder="${item.value}" type="text" class="form-control" id="input${item.id+item.baseType}">
                    </div>`
        } else if (item.baseType === 'SmallSelect') {
            let html = `<div class="col-xs-5 pull-left">
                            <select class="form-control" id="input${item.id+item.baseType}">`

            for (let itens of item.itens) {
                html += `<option ${isCurrent(item,itens)} >${itens}</option>`
            }

            html +=     `</select>
                     </div>`

            return html                        
        } else if (item.baseType === 'Switch') {

            return `<div class="col-xs-5 pull-left">
                        <label class="switch switch-label switch-pill switch-success switch-sm float-right config-switch">
                            <input type="checkbox" ${isChecked(item)} class="switch-input" id="input${item.id+item.baseType}">
                            <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                        </label>
                    </div>`

        }

        function isCurrent(item,itens) {

            if (item.value===itens){
                return `selected`
            } else {
                return ""
            }

        }

        function isChecked(item) {
            if (item.value !== "false") {
                return `checked`
            } else {
                return ""
            }
        }

    }

    static Trigger() {
        let sideconfig = document.getElementById("config-bar");
        let content = document.getElementById("TABLECONTENT_MPAGE").parentElement;
        let footer = document.getElementById("TABLEFOOTER_MPAGE").parentElement;
        content.style.transitionDuration = ".25s";
        footer.style.transitionDuration = ".25s";
        if (sideconfig.style.width === "0px" || !sideconfig.style.width) {
            Config.Expand();
        } else {
            Config.Collapse();
        }
    }

    static Expand() {
        let sideconfig = document.getElementById("config-bar");
        let content = document.getElementById("TABLECONTENT_MPAGE").parentElement;
        let footer = document.getElementById("TABLEFOOTER_MPAGE").parentElement;
        sideconfig.style.width = Config.width();
        content.style.paddingRight = `calc(${Config.width()} + 15px`;
        footer.style.paddingRight = `calc(${Config.width()} + 15px`;;
    }

    static Collapse() {
        let sideconfig = document.getElementById("config-bar");
        let content = document.getElementById("TABLECONTENT_MPAGE").parentElement;
        let footer = document.getElementById("TABLEFOOTER_MPAGE").parentElement;
        sideconfig.style.width = "0px";
        content.style.paddingRight = "15px";
        footer.style.paddingRight = "15px";
    }

    // static EnableButton() {
    //     document.getElementById("SHOWCONFIG_MPAGE").onclick = Config.Trigger;
    // }

    static EnableConfirm(itemId) {

        let Item = document.getElementById(`parm${itemId}`);
        let Input = document.getElementById(`input${itemId}`);
        let Button = document.getElementById(`button${itemId}`);

        Item.addEventListener('click', () => {
            if(Item.nextElementSibling.style.display !== 'block' ){
                Item.nextElementSibling.style.setProperty('display', 'block');
            } else {
                Item.nextElementSibling.style.setProperty('display', 'none');
            }

        })
        Button.addEventListener('click', ()=>{

            gx.fx.obs.notify("Method_Custom.parm", [itemId, Input.value]);

        });

    }

    static StoreIds(newArray, item) {

        newArray.push(`${item.id+item.baseType}`);

        return newArray
    }

};


