import type from '../actionTypes';
export function changeMsg(payload) {
    // 返回了一个action
    return {
        type: type.TEST_CHANGE_MSG,
        payload
    }
}