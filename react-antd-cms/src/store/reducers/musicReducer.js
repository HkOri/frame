import type from '../actionTypes'

const initState = {
    list: []
}
export default function musicReducer(state = initState, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case type.MUSIC_UPDATE:
            console.log('有组件触发了接口，数据是', action);
            newState.list = action.payload;
            break;
        default:
            break;
    }
    return newState;
}