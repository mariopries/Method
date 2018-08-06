Config = class {
    constructor() {
        document.getElementById("method_config_bar_script").remove();
    }

    Load(items) {
        if (!document.getElementById("config-bar")) {
            this.items = JSON.parse(items);
            let sideConfig = document.createElement("div");
            sideConfig.className = "sidebar-config";
            sideConfig.id = "config-bar";
            sideConfig.innerHTML = this.Build();
            document.body.appendChild(sideConfig);
            let buttons = this.items.filter(value => value.Type === "CB");
            buttons.forEach(value => {
                Config.ButtonToggle(`btnConfig${value.Id}`);
            });
            Config.EnableButton();
        }
    }

    Build() {
        let rawHTML = "<ul>";
        for (let i = 0; i < this.items.length; i++) {
            rawHTML += "<li>";
            switch (this.items[i].Type) {
                case "SW":
                    rawHTML += Config.BuildSwitch(this.items[i]);
                    break;

                case "CB":
                    rawHTML += Config.BuildCombo(this.items[i]);
                    break;

                case "BI":
                    rawHTML += Config.BuildInput(this.items[i]);
                    break;
            }
            rawHTML += "</li>";
        }
        rawHTML += "</ul>";
        return rawHTML;
    }

    static BuildSwitch(item) {
        return `<i class="menu-icon ${item.Icon}"></i>
                <span>&ThickSpace;${item.Name}</span>
                <label class="switch switch-label switch-pill switch-success switch-sm float-right config-switch">
                    <input type="checkbox" class="switch-input" checked>
                    <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                </label>`;
    }

    static BuildCombo(item) {
        return `<i class="menu-icon ${item.Icon}"></i>
                <span>&ThickSpace;${item.Name}</span>
                <div class="btn-group" dropdown placement="bottom right" ng-reflect-placement="bottom right">
                    <button id="btnConfig${
                        item.Id
                    }" class="btn btn-success dropdown-toggle config-btn" dropdowntoggle="" type="button" aria-haspopup="true" aria-expanded="false">
                        Grupo
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right" role="menu" style="left: auto; right: 0px;">
                        <li role="menuitem">
                            <a class="dropdown-item" href="#">Grupo 1</a>
                        </li>
                        <li role="menuitem">
                            <a class="dropdown-item" href="#">Grupo 2</a>
                        </li>
                        <li role="menuitem">
                            <a class="dropdown-item" href="#">Grupo 3</a>
                        </li>
                    </ul>
                </div>`;
    }

    static BuildInput(item) {
        return `<i class="menu-icon ${item.Icon}"></i>
                <span>&ThickSpace;${item.Name}</span>
                <div class="config-input">
                    <input type="text" class="form-control" placeholder="${
                        item.Name
                    }">
                </div>`;
    }

    static ButtonToggle(buttonId) {
        document.getElementById(buttonId).addEventListener("click", () => {
            let dropdown = document.getElementById(buttonId).nextElementSibling;
            if (dropdown.style.display !== "block") {
                dropdown.style.setProperty("display", "block");
            } else {
                dropdown.style.setProperty("display", "none");
            }
        });
    }

    static Trigger() {
        let sideconfig = document.getElementById("config-bar");
        let content = document.getElementById("TABLECONTENT_MPAGE")
            .parentElement;
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
        let content = document.getElementById("TABLECONTENT_MPAGE")
            .parentElement;
        let footer = document.getElementById("TABLEFOOTER_MPAGE").parentElement;
        sideconfig.style.width = "250px";
        content.style.paddingRight = "265px";
        footer.style.paddingRight = "265px";
        // setTimeout(ChangeName('sidebar-config expanded'),2500);
    }

    static Collapse() {
        let sideconfig = document.getElementById("config-bar");
        let content = document.getElementById("TABLECONTENT_MPAGE")
            .parentElement;
        let footer = document.getElementById("TABLEFOOTER_MPAGE").parentElement;
        sideconfig.style.width = "0px";
        content.style.paddingRight = "15px";
        footer.style.paddingRight = "15px";
    }

    static EnableButton() {
        document.getElementById("SHOWCONFIG_MPAGE").onclick = Config.Trigger;
    }
}
