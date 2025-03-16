const convertBase64ToBlob = (base64Image) => {
    try {
        const validBase64Pattern = /^(data:image\/(png|jpeg|jpg|gif|bmp);base64,)?[A-Za-z0-9+/=]+$/;
        if (!validBase64Pattern.test(base64Image)) {
            return false;
        }
        const base64String = base64Image.replace(/^data:image\/(png|jpeg|jpg|gif|bmp);base64,/, "");
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], { type: 'image/png' });

        return blob;
    } catch (error) {
        return false;
    }
}


export default convertBase64ToBlob
