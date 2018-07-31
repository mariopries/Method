export class Config {

    Load(items) {
        this.items = items;
        let sideConfig = document.createElement("div");
        sideConfig.className = "sidebar-config";
        sideConfig.id = "config-bar";
        sideConfig.innerHTML = this.Build();
        document.body.appendChild(sideConfig);
        Config.ButtonToggle("btnConfig1");
    }

    Build() {
        let rawHTML = "<ul>";
        for (let i = 0; i < this.items.length; i++) {
            rawHTML += "<li>" + Config.BuildSwitch(this.items[i]) + "</li>";
        }
        rawHTML +=
            "<li>" +
            Config.BuildCombo({ icon: "fas fa-cog", title: "Teste Combo" }) +
            "</li>";
        rawHTML += "</ul>";
        return rawHTML;
    }

    static BuildSwitch(item) {
        return `<i class="menu-icon ${item.icon}"></i>
                <span>&ThickSpace;${item.title}</span>
                <label class="switch switch-label switch-pill switch-success switch-sm float-right config-switch">
                    <input type="checkbox" class="switch-input" checked>
                    <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                </label>`;
    }

    static BuildCombo(item) {
        return `<i class="menu-icon ${item.icon}"></i>
                <span>&ThickSpace;${item.title}</span>
                <div class="btn-group" dropdown placement="bottom right" ng-reflect-placement="bottom right">
                    <button id="btnConfig1" class="btn btn-success dropdown-toggle config-btn" dropdowntoggle="" type="button" aria-haspopup="true" aria-expanded="false">
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
        if (sideconfig.style.width === '0px' || !sideconfig.style.width) {
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
        // setTimeout(ChangeName('sidebar-config collapsed'),2500);
    }
}