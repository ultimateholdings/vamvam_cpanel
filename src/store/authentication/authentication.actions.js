export const actions = {
    updateBoxValue: (state, action) => {
        state.find(el => el.inputNumber === action.payload.inputNumber).value = action.payload.value
    },
}