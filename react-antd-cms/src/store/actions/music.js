import type from '../actionTypes';
export function update(payload) {
    // 返回了一个action
    return {
        type: type.MUSIC_UPDATE,
        payload
    }
}