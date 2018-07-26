class Config {
    constructor() {
        let items = [
            {
                icon: "fa fas-cog",
                title: "Config 1",
                direction: "#"
            },
            {
                icon: "fa fas-cog",
                title: "Config 2",
                direction: "#"
            },
            {
                icon: "fa fas-cog",
                title: "Config 3",
                direction: "#"
            },
            {
                icon: "fa fas-cog",
                title: "Config 4",
                direction: "#"
            },
            {
                icon: "fa fas-cog",
                title: "Config 5",
                direction: "#"
            }
        ];
        this.items = items;
    }

    Load() {
        let sideConfig = document.createElement("div");
        sideConfig.className = "sidebar-config";
        sideConfig.innerHTML = this.Build();
        document.body.appendChild(sideConfig);
    }

    Build() {
        let rawHTML = "<ul>";
        for (let i = 0; i < this.items.length; i++) {
            rawHTML += `<li>
                <a href="${this.items[i].direction}">
                    <i class="${this.items[i].icon}"></i>
                    <span>${this.items[i].title}</span>
                    <i class="menu-expand"></i>
                </a>
            </li>`;
        }
        rawHTML += "</ul>";
        return rawHTML;
    }
}
