let userReducer = (state = false, action) => {
    switch (action.type) {
        case "USER_STATUS":
            return action.payload;

        default:
            return state;
    }
}

export default userReducer;