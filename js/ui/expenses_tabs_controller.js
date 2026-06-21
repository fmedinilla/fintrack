export function setupExpenseTabs(tabButtons, panels) {
    const tabs = Array.from(tabButtons);
    const panelList = Array.from(panels);

    function activateTab(tabName) {
        tabs.forEach(button => {
            const isActive = button.dataset.expenseTab === tabName;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-selected", String(isActive));
        });

        panelList.forEach(panel => {
            const isActive = panel.dataset.expensePanel === tabName;
            panel.hidden = !isActive;
            panel.classList.toggle("is-active", isActive);
        });
    }

    tabs.forEach(button => {
        button.addEventListener("click", () => activateTab(button.dataset.expenseTab));
    });

    activateTab(tabs.find(button => button.classList.contains("is-active"))?.dataset.expenseTab ?? "history");
}