import { createContext, useContext } from "react";

export const Context = createContext()

export const initialState = {
    tableData: [],
    addModal: false
}

export const reducer = (state, action) => {
    const _state = { ...state }
    const _actions = Array.isArray(action) ? action : [action]

    for (const { type, payload } of _actions) {
        const _payload = typeof payload == 'function' ? payload(_state) : payload
        console.log({ type, _payload })

        switch (type) {
            case 'updateTableData':
                _state.tableData = _payload
                break
            default:
                break
        }
    }

    return _state
}

export function useData() { return useContext(Context) }