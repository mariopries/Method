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
        sideConfig.id = "config-bar"
        sideConfig.innerHTML = this.Build();
        document.body.appendChild(sideConfig);
    }

    Build() {
        let rawHTML = "<ul>";
        for (let i = 0; i < this.items.length; i++) {
            rawHTML += 
            `<li>
                <i class="menu-icon ${this.items[i].icon}"></i>
                <span>&ThickSpace;${this.items[i].title}</span>
                <label class="switch switch-label switch-pill switch-success switch-sm float-right config-switch">
                    <input type="checkbox" class="switch-input" checked>
                    <span class="switch-slider" data-checked="On" data-unchecked="Off"></span>
              </label>
            </li>`;
        }
        rawHTML += "</ul>";
        return rawHTML;
    }

    Trigger() {
        let sideconfig = document.getElementById('config-bar');
        let content = document.getElementById('TABLECONTENT_MPAGE').parentElement;
        content.style.transitionDuration = '.25s';

        CollapseExpand()

        function CollapseExpand() {
            if (sideconfig.style.width === '0px' || !sideconfig.style.width){
                sideconfig.style.width = '250px'
                content.style.paddingRight = '265px';
                // setTimeout(ChangeName('sidebar-config expanded'),2500);
            } else {
                sideconfig.style.width = '0px';
                content.style.paddingRight = '15px';
                // setTimeout(ChangeName('sidebar-config collapsed'),2500);
            }
        }
    }
}
if (document.getElementById('SHOWCONFIG_MPAGE')){
    let sc = new Config;
    sc.Load();
    document.getElementById('SHOWCONFIG_MPAGE').onclick = sc.Trigger;
}
