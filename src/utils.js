export const getItemIndex = (item) => {
    const splittedUrl = item.split('/');
    return  splittedUrl[splittedUrl.length - 2];

}