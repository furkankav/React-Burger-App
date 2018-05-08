export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
    /* instead of using return {
        ...state,
        ...... 
    } We use this utility class to make reducers look leaner */
}