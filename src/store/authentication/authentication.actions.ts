export const actions = {
    updateBoxValue: (state: any[], action: any) => {
        state.find(el => el.inputNumber === action.payload.inputNumber).value = action.payload.value
    },
}