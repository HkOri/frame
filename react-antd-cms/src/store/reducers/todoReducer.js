const initState = {
    list: []
}
export default function todoReducer(state = initState, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'todoadd':
            newState.list.push(action.payload);
            break;
        case 'todoedit':
            newState.list.map(ele => {
                if (ele.id === action.payload.id) {
                    ele.task = action.payload.task;
                }
            })
            break;
        case 'tododel':
            newState.list = newState.list.filter(ele => (ele.id !== action.payload));
            break;
    }
    return newState;
}