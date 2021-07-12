import type from '../actionTypes'

const initState = {
    msg: 'Hello Reudx'
}
export default function testReducer(state = initState, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case type.TEST_CHANGE_MSG:
            newState.msg = action.payload;
            break;
        default:
            break;
    }
    return newState;
}