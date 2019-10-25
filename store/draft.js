export const state = () => {
    return {
        draftHistory: []
    }
}

export const mutations = {
    setHistory(state, data){
        state.draftHistory.unshift(data);
    },
    delHistory(state,index){
        state.draftHistory.splice(index,1)
    }
}