export const timedTabs = () => {
    // Gather the tab menus
    const tabGroups = Array.from(document.querySelectorAll<HTMLDivElement>("[wp-timed-tabs]")); // Select all elements with the 'welpers-tabs-timed' attribute

    tabGroups.forEach((tabGroup) => {
        const tabs = Array.from(tabGroup.querySelectorAll<HTMLAnchorElement>("a")); // Select the tab links inside the timed container
        const tabCount = tabs.length;
        let currentIndex = 0;

        const switchInterval = parseInt(tabGroup.getAttribute("wp-tabs-timed") ?? '3000', 10);
        
        tabs.forEach((tab) => {
            tab.addEventListener('click', (e) => e.preventDefault());
        })

        const createTabSwitcher =() => {
            let currentIndex = 0;

            return {
                switchTab: () => {
                    tabs[currentIndex].click();
                    currentIndex = (currentIndex + 1) % tabCount;
                },
                setCurrentIndex(index: number) {
                    currentIndex = index;
                }
            }
        }

        const {switchTab, setCurrentIndex} = createTabSwitcher();

        const startInterval = (intervalFn: () => void, interval: number) => window.setInterval(intervalFn, interval);

        const clearExistingInterval = (intervalId: number | undefined): void =>{
            if (intervalId != undefined) {
                window.clearInterval(intervalId);
            }
        }

        let intervalId: number | undefined;

        const startTabSwitching = (): void => {
            clearExistingInterval(intervalId);
            intervalId = startInterval(switchTab, switchInterval);
        }

        const pauseTabSwitching = (): void => {
            clearExistingInterval(intervalId);
        }

        const pauseContainer = tabGroup.closest<HTMLElement>('[vdx-tabs-pause]');

        if (pauseContainer) {
            pauseContainer.addEventListener('mouseenter', pauseTabSwitching);
            pauseContainer.addEventListener('mouseleave', startTabSwitching);
        } else {
            tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    setCurrentIndex(index);
                    startTabSwitching();
                });
            });
        }
        
        startTabSwitching();
    });
};