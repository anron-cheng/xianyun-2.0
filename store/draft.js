export const state = () => {
    return {
        draftHistory: []
    }
}

export const mutations = {
    setHistory(state, data){
        state.draftHistory.push(data);
    },
    delHistory(state,index){
        state.draftHistory.splice(index,1)
    }
}