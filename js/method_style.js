class Config {
    constructor() {
        let items = [
            {
                icon: "fas fa-cog",
                title: "Config 1",
                direction: "#"
            },
            {
                icon: "fas fa-cog",
                title: "Config 2",
                direction: "#"
            },
            {
                icon: "fas fa-cog",
                title: "Config 3",
                direction: "#"
            },
            {
                icon: "fas fa-cog",
                title: "Config 4",
                direction: "#"
            },
            {
                icon: "fas fa-cog",
                title: "Config 5",
                direction: "#"
            }
        ];
        this.items = items;
    }

    Load() {
        let sideConfig = document.createElement("div");
        sideConfig.className = "sidebar-config expanded";
        sideConfig.id = "config-bar";
        sideConfig.innerHTML = this.Build();
        document.body.appendChild(sideConfig);
        this.ButtonToggle('btnConfig1');
    }

    Build() {
        let rawHTML = "<ul>";
        for (let i = 0; i < this.items.length; i++) {
            rawHTML += '<li>' + this.BuildSwitch(this.items[i]) + '</li>';
        }
        rawHTML += '<li>' + this.BuildCombo({icon: "fas fa-cog", title: 'Config 6'}) + '</li>';
        rawHTML += "</ul>";
        return rawHTML;
    }

    BuildSwitch(item) {
        return `<i class="menu-icon ${item.icon}"></i>
                <span>&ThickSpace;${item.title}</span>
                <label class="switch switch-label switch-pill switch-success switch-sm float-right config-switch">
                    <input type="checkbox" class="switch-input" checked>
                    <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
                </label>`;
    }

    BuildCombo(item) {
        return `<i class="menu-icon ${item.icon}"></i>
                <span>&ThickSpace;${item.title}</span>
                <div class="btn-group" dropdown placement="bottom right" ng-reflect-placement="bottom right">
                    <button id="btnConfig1" class="btn btn-success dropdown-toggle config-btn" dropdowntoggle="" type="button" aria-haspopup="true" aria-expanded="false">
                        Grupo
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right" role="menu" style="left: auto; right: 0px;">
                        <li role="menuitem">
                            <a class="dropdown-item" href="#">Action</a>
                        </li>
                        <li role="menuitem">
                            <a class="dropdown-item" href="#">Another action</a>
                        </li>
                        <li role="menuitem">
                            <a class="dropdown-item" href="#">Something else here</a>
                        </li>
                    </ul>
                </div>`
    }

    ButtonToggle(buttonId) {
        document.getElementById(buttonId).addEventListener('click', () => {
            let dropdown = document.getElementById(buttonId).nextElementSibling;
            if (dropdown.style.display !== 'block') {
                dropdown.style.setProperty('display', 'block');
            } else {
                dropdown.style.setProperty('display', 'none');
            }
        })
    }

    Trigger() {
        let sideconfig = document.getElementById("config-bar");
        let content = document.getElementById("TABLECONTENT_MPAGE")
            .parentElement;
        let footer = document.getElementById("TABLEFOOTER_MPAGE").parentElement;
        content.style.transitionDuration = ".25s";
        footer.style.transitionDuration = ".25s";

        CollapseExpand();

        function CollapseExpand() {
            if (sideconfig.style.width === "0px" || !sideconfig.style.width) {
                sideconfig.style.width = "250px";
                content.style.paddingRight = "265px";
                footer.style.paddingRight = "265px";
                // setTimeout(ChangeName('sidebar-config expanded'),2500);
            } else {
                sideconfig.style.width = "0px";
                content.style.paddingRight = "15px";
                footer.style.paddingRight = "15px";
                // setTimeout(ChangeName('sidebar-config collapsed'),2500);
            }
        }
    }
}

if (document.getElementById("SHOWCONFIG_MPAGE")) {
    let sc = new Config();
    sc.Load();
    document.getElementById("SHOWCONFIG_MPAGE").onclick = sc.Trigger;
}
