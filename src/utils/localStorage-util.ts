type localStoregeStateType = {
    cards: {
        cardPacks: [],
        myPacks: boolean,
        page: number,
        pageCount: number,
        min: number,
        max: number,
        minCardsCount: number,
        maxCardsCount: number,
        sortPacksDirection: number,
        sortBy: string,
        user_id: string,
        packName: string,
        searchText: string,
    }
}

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('team_project');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: localStoregeStateType) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('team_project', serializedState);
    } catch {

    }
};